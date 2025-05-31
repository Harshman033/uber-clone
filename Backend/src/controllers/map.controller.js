import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { distanceTime, locationCoordinates } from "../services/map.service.js";

const locationDetails = asyncHandler(async(req, res)=>{
try {
    const {query} = req.query;
    
    if(!query){
        throw new ApiError(400, "Query parameter is required" )
    }
    const suggestions = await locationCoordinates(query);

    return res.status(200).json(
      new ApiResponse(200, suggestions, "Location suggestions fetched successfully!")
    );
} catch (error) {
    throw new ApiError(500, error.message || "Something went wrong when fetching the location details")
}
});

const distanceAndTime = asyncHandler(async(req, res)=>{
    try {
        const {coordinates} = req.body;
        console.log('inside distanceAndTime and this is the body', coordinates)

        if(!coordinates||coordinates.length!=2){
            throw new ApiError(400, "Invalid coordinates format" )
        }

        const {distanceInKm, durationInMin} = await distanceTime(coordinates);
        console.log("inside distance time controller ", distanceInKm, durationInMin )

        return res.status(200)
        .json(
            new ApiResponse(200, {distanceInKm, durationInMin}, "Distance, Time and steps fetched successfully!")
        )

    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong when fetching the date and time")
    }
});




export {locationDetails, distanceAndTime}