import jwt from 'jsonwebtoken';
import { ApiError } from '../src/utils/ApiError.js';
import { User } from '../src/models/user.model.js';
import { asyncHandler } from '../src/utils/asyncHandler.js';

export const verifyJwt = asyncHandler(async (req, res, next) =>{
try {
    const token = req.cookies?.accessToken || req.headers("Authorization").replace("Bearer ", "");

    if(!token)throw new ApiError(401, "Unauthorized request");
   
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const user = await User.findById(verifiedToken._id);

    if(!user) throw new ApiError(401, "Invalid access token");

    req.user =  user;

    next();

} catch (error) {
    throw new ApiError(401,  error.message || "Invalid Access Token")
}
})