import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import { createUser } from "../services/user.service.js";
import { generateAccessAndRefreshToken } from "../utils/tokenGenerator.js";

const registerUser = asyncHandler(async (req, res)=>{
    const validationResults = validationResult(req);
    if(!validationResults.isEmpty()) throw new ApiError(400, 'Invalid user input', validationResults.array());
   
    const {fullName, email, password, phoneNumber} = req.body;
    
    if(!fullName||!email||!password){
        throw new ApiError(400, 'All fields are required')
    }

    const {user, accessToken, refreshToken} = await createUser({fullName, email, password});

    const options = {
        httpOnly : true,
        secure : true,
        maxAge :24 * 60 * 60 * 1000
    }
    
    return res.status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
   new ApiResponse(200,
      {
         user, accessToken
      },
      "User registered successfully!"
   )
)

});

const loginUser = asyncHandler(async (req, res)=>{
    const validationResults = validationResult(req);
  
    if(!validationResults.isEmpty()) throw new ApiError(400, 'Invalid user input', validationResults.array());
   
    const {email, password} = req.body;
   
    const foundUser = await User.findOne({email} ).select("+password");
   
    if(!email) throw new ApiError(401, "Incorrect email or password");
   
    const isPasswordCorrect = foundUser.comparePassword(password);
   
    if(!isPasswordCorrect) throw new ApiError(401, "Incorrect email or password");
   
    const {refreshToken, accessToken, user} = await generateAccessAndRefreshToken(foundUser.email);

    const options = {
        httpOnly : true,
        secure : true,
        maxAge :24 * 60 * 60 * 1000
    }
   
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
       new ApiResponse(200,
          {
             user, accessToken
          },
          "User logged in successfully!"
       )
    )
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
           req.user._id ,
        {
            $set : {refreshToken : undefined}
        },
        {
            new : true
        });

    
 const options = {
    httpOnly : true,
    secure : true,
  }
 
  return res.status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(
    new ApiResponse(200, {}, "User logged out successfully!")
  )
 
    } catch (error) {
        throw new ApiError(500, "Internal server Error")
    }
});

const userProfile = asyncHandler(async (req, res) => {
   try {
     const user = req.user;
 
     return res.status(200)
     .json(
         new ApiResponse(200, user, "User profile rendered successfully!")
     )
   } catch (error) {
    throw new ApiError(500, "Something went wrong while fetching the user details")
   }
})

const regenerateAccessToken = asyncHandler(async (req, res) => {
    try {
      const incomingToken = req.cookies?.refreshToken || req.body.refreshToken;
   
      if(!incomingToken){
      throw new ApiError(401, "Unauthorised request");
      }
   
      const decodedToken = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET)
   
      const user = await User.findById(decodedToken?._id)
   
      if(!user){
         throw new ApiError(401, "Unauthorised request");
      }
   
      if(incomingToken !== user?.refreshToken){
         throw new ApiError(401, "Refresh token expired or used");
      }
   
      const {refreshToken, accessToken} = await generateAccessAndRefreshToken(user._id)
   
      const options = {
         httpOnly : true,
         secure : true,
         maxAge :24 * 60 * 60 * 1000
      }
   
      return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200,
         {accessToken, refreshToken},
         "Access token regenerated successfully!"
   
        )
      )
    } catch (error) {
     throw new ApiError(401, error?.message || "invalid refresh token")
    }
  })



export {registerUser, loginUser, logoutUser, userProfile, regenerateAccessToken};