import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessAndRefreshToken } from "../utils/tokenGenerator.js";

const createCaptain = async function({fullName, email, password, vehicle}){
if(!fullName||!email||!password||!vehicle) throw new ApiError(400, "All fields are required")
  
    const createdCaptain = await Captain.create({
        fullName:{
            firstName : fullName.firstName,
            lastName : fullName.lastName
        }, email, password,
        vehicle : {
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity,
            type : vehicle.vehicleType,
        }
    });
  
    const {accessToken, refreshToken, captain} = await generateAccessAndRefreshToken(email);
   
    if(!accessToken || !refreshToken) throw new ApiError(500, "Internal error while generating access and refresh token");

   return {
    captain : captain.toJSON(),
    accessToken,
    refreshToken
   }
}