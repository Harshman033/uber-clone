import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import { createUser } from "../services/user.service.js";

const registerUser = asyncHandler(async (req, res)=>{
try {
    const validationResults = validationResult(req);
    if(!validationResults.isEmpty()) throw new ApiError(400, 'Invalid user input', validationResults.array());
    const {fullName, email, password, phoneNumber} = req.body;
    console.log(req.body);
    
    if(!fullName||!email||!password){
        throw new ApiError(400, 'All fields are required')
    }

    const {user, accessToken, refreshToken} = await createUser({fullName, email, password});

    const options = {
        httpOnly : true,
        secure : true
    }
    console.log("Access Token:", accessToken);
console.log("Refresh Token:", refreshToken);
    
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
   
} catch (error) {
    throw new ApiError(500, error.message || "Registeration failed")
}
});




export {registerUser};