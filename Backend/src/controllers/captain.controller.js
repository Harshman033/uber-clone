import { Captain } from "../models/captain.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js';
import { generateAccessAndRefreshTokenForCaptain } from "../utils/tokenGenerator.js";
import { createCaptain } from "../services/captain.service.js";
import jwt from 'jsonwebtoken'

const registerCaptain = asyncHandler(async (req, res)=>{
    const validationResults = validationResult(req);
    if(!validationResults.isEmpty()) throw new ApiError(400, 'Invalid user input', validationResults.array());
   
    const {fullName, email, password, vehicle} = req.body;
    
    if(!fullName||!email||!password||!vehicle){
        throw new ApiError(400, 'All fields are required')
    }

    const {captain, accessToken, refreshToken} = await createCaptain({fullName, email, password, vehicle});

    const options = {
        httpOnly : true,
        secure : true,
        maxAge :24 * 60 * 60 * 1000,
         path : '/api/v1/captains'
    }
    
    return res.status(200)
   .cookie("captain_accessToken", accessToken, options)
   .cookie("captain_refreshToken", refreshToken, {
    httpOnly : true,
      secure : true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path : '/api/v1/captains'
  })
   .json(
   new ApiResponse(200,
      {
         captain
      },
      "Captain registered successfully!"
   )
)
});


const loginCaptain = asyncHandler(async (req, res) =>{
    const validationResults = validationResult(req);
  
    if(!validationResults.isEmpty()) throw new ApiError(400, 'Invalid user input', validationResults.array());

    const {email, password} = req.body;

    console.log("email and pass", email, password)

    if(!email||!password) throw new ApiError(400, "All fields are required");

    const foundCaptain = await Captain.findOne({email}).select("+password");

    if(!foundCaptain) throw new ApiError(400, "Incorrect email or password");

    const isPasswordCorrect = foundCaptain.comparePassword(password);

    if(!isPasswordCorrect) throw new ApiError(400, "Incorrect email or password");

    const {refreshToken, accessToken, captain} = await generateAccessAndRefreshTokenForCaptain(email);

    
    const options = {
        httpOnly : true,
        secure : true,
        maxAge :24 * 60 * 60 * 1000,
        path : '/api/v1/captains'
    }

    return res.status(200)
    .cookie("captain_accessToken", accessToken, options)
    .cookie("captain_refreshToken", refreshToken, {
        httpOnly : true,
          secure : true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
           path : '/api/v1/captains'
      })
    .json(
        new ApiResponse(200, {captain}, "Captain logged in successfully!")
    )

});

const logoutCaptain = asyncHandler(async (req, res)=>{
   try {
     const captain = await Captain.findByIdAndUpdate(
         req.captain._id,
         {
             $set : {refreshToken:undefined}
         },
         {
            new : true
         }
     )

     if(!captain) throw new ApiError(401, "Unauthorized request");

    const options = {
        httpOnly : true,
        secure : true,
    }

 
     return res.status(200)
     .clearCookie("captain_refreshToken", options)
     .clearCookie("captain_accessToken", options)
     .json(
        new ApiResponse(200, {}, "User logged out successfully!")
     )
   } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong while logging out the captain")
   }

});


const captainProfile = asyncHandler(async(req, res)=>{
   try {
     const captain = req.captain;
     return res.status(200)
     .json(
        new ApiResponse(200, captain, "captain details fetched successfully!")
     )
   } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong while fetching the captain details")
   }
});

const regenerateAccessTokenForCaptain = asyncHandler(async(req,res)=>{
     try {
          const incomingToken = req.cookies?.captain_refreshToken;
          console.log('inside captain token gen')
       
          if(!incomingToken){
          throw new ApiError(401, "Unauthorised request");
          }
       
          const decodedToken = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
          console.log('decoded token inside captain', decodedToken)
       
          const captain = await Captain.findById(decodedToken?._id).select('+refreshToken');
          console.log('captain', captain)
       
          if(!captain){
             throw new ApiError(401, "Unauthorised request");
          }
          console.log('incomingToken inside captain', incomingToken, 'user.refreshToken',  captain?.refreshToken)
          if(incomingToken !== captain?.refreshToken){
            console.log('incomingToken inside captain', incomingToken, 'user.refreshToken',  captain?.refreshToken)
             throw new ApiError(401, "Refresh token expired or used");
          }
          const accessToken = captain.generateAccessToken();
          console.log('generated access token inside captain', accessToken)
       
          const options = {
             httpOnly : true,
             secure : true,
             maxAge :24 * 60 * 60 * 1000,
             path : '/api/v1/captains'
          }
       
          return res.status(200)
          .cookie("captain_accessToken", accessToken, options)
          .json(
            new ApiResponse(200,
             {accessToken},
             "Access token regenerated successfully!"
       
            )
          )
        } catch (error) {
         throw new ApiError(401, error?.message || "invalid refresh token")
        }
})

export {registerCaptain, loginCaptain, logoutCaptain, captainProfile, regenerateAccessTokenForCaptain};