import { Captain } from "../models/captain.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

export const generateAccessAndRefreshToken = async (email)=>{
    try {
        const user = await User.findOne({email});
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false });
    
    return {refreshToken, accessToken, user}
    } catch (error) {
       throw new ApiError(500, error.message ||  "Something went wrong while generating the access and refresh token")
    }
}

export const generateAccessAndRefreshTokenForCaptain = async (email)=>{
    try {
        console.log("Looking for captain with email:", email);
        const captain = await Captain.findOne({email});
        console.log("Found captain:", captain);
    const accessToken = captain.generateAccessToken();
    const refreshToken = captain.generateRefreshToken();
    
    captain.refreshToken = refreshToken;
    await captain.save({validateBeforeSave: false });
    
    return {refreshToken, accessToken, captain}
    } catch (error) {
       throw new ApiError(500, error.message || "Something went wrong while generating the access and refresh token")
    }
}