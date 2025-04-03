import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler((req, res)=>{
const validationResults = validationResult(req);
if(!validationResults.isEmpty()) throw new ApiError(400, 'Invalid user input', validationResults.array());

});


export {registerUser};