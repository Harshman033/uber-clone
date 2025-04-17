import { Captain } from "../models/captain.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js';
import { generateAccessAndRefreshTokenForCaptain } from "../utils/tokenGenerator.js";
import { createCaptain } from "../services/captain.service.js";

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
        maxAge :24 * 60 * 60 * 1000
    }
    
    return res.status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
   new ApiResponse(200,
      {
         captain, accessToken
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
        maxAge :24 * 60 * 60 * 1000
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {captain, accessToken}, "Captain logged in successfully!")
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
     .clearCookie("refreshToken", options)
     .clearCookie("accessToken", options)
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

export {registerCaptain, loginCaptain, logoutCaptain, captainProfile};