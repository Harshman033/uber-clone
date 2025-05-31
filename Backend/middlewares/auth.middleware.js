import jwt from 'jsonwebtoken';
import { ApiError } from '../src/utils/ApiError.js';
import { User } from '../src/models/user.model.js';
import { asyncHandler } from '../src/utils/asyncHandler.js';
import { Captain } from '../src/models/captain.model.js';

export const verifyJwt = asyncHandler(async (req, res, next) =>{
try {
    const token = req.cookies?.user_accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Cookies in verifyJwt:", req.cookies);
    console.log("token in verifyJwt", token)

    if(!token)throw new ApiError(401, "Unauthorized request");
   
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const user = await User.findById(verifiedToken._id);

    if(!user) throw new ApiError(401, "Invalid access token");

    req.user =  user;

    next();

} catch (error) {
    throw new ApiError(401,  error.message || "Invalid Access Token")
}
});

export const verifyJwtForCaptain = asyncHandler(async(req, res, next)=>{
try {
    const token = req.cookies?.captain_accessToken || req.header("Authorization").replace("Brearer ", "");

    if(!token) throw new ApiError(401, "Unauthorized request");

    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const captain = await Captain.findById(verifiedToken._id);

    if(!captain) throw new ApiError(401, "Invalid Access Token");

    req.captain = captain;

    next();
} catch (error) {
    throw new ApiError(401,  error.message || "Invalid Access Token")
}
})