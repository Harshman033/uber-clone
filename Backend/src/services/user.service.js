import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessAndRefreshToken } from "../utils/tokenGenerator.js";

export const createUser = async function({fullName, email, password}){
if(!fullName||!email||!password) throw new ApiError(400, "All fields are required")
  
    const createdUser = await User.create({
        fullName:{
            firstName : fullName.firstName,
            lastName : fullName.lastName
        }, email, password
    });

    
    const {accessToken, refreshToken, user} = await generateAccessAndRefreshToken(email);
    console.log("Refresh Token before saving:", refreshToken);
    console.log("Type of refreshToken:", typeof refreshToken);
    
    if(!accessToken || !refreshToken) throw new ApiError(500, "Internal error while generating access and refresh token");
   console.log("before returning the values checkpoint")
   return {
    user : user.toJSON(),
    accessToken,
    refreshToken
   }
}