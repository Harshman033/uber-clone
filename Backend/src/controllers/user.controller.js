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
        secure : true
    }
    
    return res.status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
   new ApiResponse(200,
      {
         user, refreshToken, accessToken
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
        secure : true
    }
   
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
       new ApiResponse(200,
          {
             user, refreshToken, accessToken
          },
          "User logged in successfully!"
       )
    )
});

const logoutUser = asyncHandler(async (req, res) => {
    
})




export {registerUser, loginUser};