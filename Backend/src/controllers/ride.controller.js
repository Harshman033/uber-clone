import { getFare, newRide } from "../services/ride.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js';

const createRide = asyncHandler(async(req, res)=>{
try {
     const {coordinates, vehicleType, pickup, destination} = req.body
    const user = req.user;
   
    console.log("inside the createRide controller", {coordinates, vehicleType, pickup, destination})
    if(!coordinates || !vehicleType ||!pickup ||!destination){throw new ApiError(400, "all fields are required")}

   const ride = await newRide({user, coordinates, vehicleType, pickup, destination});

   if(!ride){
    throw new ApiError(500, "Ride is not getting created");
   } 

   return res.status(200).json(
    new ApiResponse(200, ride, "Ride generated successfully!")
   )
} catch (error) {
    throw new ApiError(500, error.message || 'Something went wrong when creatig a ride')
}
});

const fetchFare = asyncHandler(async(req, res)=>{
    try {
        const {coordinates} = req.body;

        if(!coordinates){
            throw new ApiError(401, "Please provide the coordinates");
        }
      const fare = await getFare(coordinates);

      if(!fare){
        throw new ApiError(500, "Could not get fare")
      }

       return res.status(200).json(
        new ApiResponse(200, fare, "Fare fetched successfully!")
       )

    } catch (error) {
         throw new ApiError(500, error.message || 'Something went wrong when fetching the fare')
    }
})

export {createRide, fetchFare}