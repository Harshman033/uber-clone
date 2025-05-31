import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const locationCoordinates = async(query)=>{
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${query}`, {
          params : {
            format : 'json',
            limit : 5
          },
        });

     
    if (!response.data || response.data.length === 0) {
      throw new ApiError(404, "No suggestions found");
    }
        
    return response.data.map(item => ({
      name: item.display_name,
      lat: item.lat,
      lon: item.lon
    }));
       
    }catch(error){
        console.log(error?.message || "Somehting went wrong while fetching the location coordinates")
    }
}


const distanceTime = async(coordinates)=>{
   console.log(">>> getFare called with:", coordinates);
try {
   console.log(">>> inside try catch block");
  const url = "https://api.openrouteservice.org/v2/directions/driving-car";
  const headers = {
    Authorization: process.env.OPEN_ROUTE_SERVICE_API_KEY
  };
  const body = {coordinates}
  console.log("body inisde distance-time service", body)
  const response = await axios.post(url, body, {headers});

  const route = response.data.routes[0];
  console.log("route ------" , route)

  const distanceInKm = (route.summary.distance / 1000).toFixed(2);
  const durationInMin = (route.summary.duration / 60).toFixed(2);

  console.log("inside the distance-time service", distanceInKm, durationInMin)

  return {
    distanceInKm,
    durationInMin,
  };

} catch (error) {
  console.log(error.message || "Something went wrong while fetching the distance and time")
  return null;
}
}


const instructions = async(coordinates)=>{
  try {
    const url = "https://api.openrouteservice.org/v2/directions/driving-car";
    const headers = {
      Authorization: process.env.OPEN_ROUTE_SERVICE_API_KEY
    };
    const body = {coordinates}
    
    const response = await axios.post(url, body, {headers});
  
    const route = response.data.routes[0];
    console.log("route ------" , route)
  
    const steps = route.segments[0].steps.map(step=>({
      instruction : step.instruction,
      distance : step.duration,
      duration : step.duration,
      type : step.type,
      name : step.name
    }));
  
    console.log("inside the service", steps)
  
    return {
      steps
    };
  
  } catch (error) {
    console.log(error.message || "Somehting went wrong while fetching the distance and time")
  }

}



export {locationCoordinates, distanceTime, instructions}