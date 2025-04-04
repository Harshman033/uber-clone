import { User } from "../models/user.model.js";

export const generateAccessAndRefreshToken = async (email)=>{
    try {
        const user = await User.findOne({email});
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false });
    
    return {refreshToken, accessToken, user}
    } catch (error) {
       throw new ApiError(500, "Something went wrong while generating the access and refresh token")
    }
}