import { Ride } from "../models/ride.model.js";
import { distanceTime } from "./map.service.js";
import crypto from 'crypto';

const getFare = async(coordinates)=>{
    console.log("inside getFare fn ", coordinates)
if(!coordinates){
    throw new Error('Pickup and destination are required to calculate fare');
}
const result = await distanceTime(coordinates);

if (!result || result.distanceInKm === undefined || result.durationInMin === undefined) {
  throw new Error("distanceTime() returned invalid result");
}

const { distanceInKm, durationInMin } = result;

const baseFare = {
    auto : 30,
    car : 50,
    motorcycle : 20
};

const perKmRate = {
    auto : 10,
    car : 15,
    motorcycle : 8
};

const perMinuteRate = {
    auto : 2,
    car : 3,
    motorcycle : 1.5
};

const fare = {
    UberAuto : Math.ceil(baseFare.auto + (distanceInKm*perKmRate.auto) + (durationInMin*perMinuteRate.auto)),
    UberGo :  Math.ceil(baseFare.car + (distanceInKm*perKmRate.car) + (durationInMin*perMinuteRate.car)),
    UberMoto :  Math.ceil(baseFare.motorcycle + (distanceInKm*perKmRate.motorcycle) + (durationInMin*perMinuteRate.motorcycle)),
    
};

return fare
    
}


const newRide = async({user, coordinates, vehicleType, pickup, destination}) =>{
if(!user || !coordinates || !vehicleType ||!pickup || !destination){
    throw new Error('All field are required to create a ride');
}
const fare = await getFare(coordinates);
console.log("Inside the newRide service fn and this is the fare", fare[vehicleType])


const ride = await Ride.create({
    user, 
    pickup,
    destination,
    fare : fare[vehicleType],
    otp : await getOTP(4)
})

return ride;
}

const getOTP = async (num) => {
  const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
  return otp;
};


export {getFare, newRide}