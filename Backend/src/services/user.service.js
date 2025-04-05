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
   
    if(!accessToken || !refreshToken) throw new ApiError(500, "Internal error while generating access and refresh token");

   return {
    user : user.toJSON(),
    accessToken,
    refreshToken
   }
}