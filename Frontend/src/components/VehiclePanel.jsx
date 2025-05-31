import React from 'react'
import { FaUser } from "react-icons/fa";
import { BsChevronCompactDown } from "react-icons/bs";
import userApi from '../api/userApi';
import { useEffect } from 'react';
import { useState } from 'react';

const vehicles = [
  {
    id: 1,
    name: "UberGo",
    image: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
    capacity: 4,
    eta: "Two minutes away",
    description: "Affordable, compact rides",
    price: 67
  },
  {
    id: 2,
    name: "UberMoto",
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    capacity: 1,
    eta: "Three minutes away",
    description: "Affordable motorcycle rides",
    price: 45
  },
  {
    id: 3,
    name: "UberAuto",
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    capacity: 3,
    eta: "Three minutes away",
    description: "Affordable auto rides",
    price: 52
  }
];

const VehiclePanel = ({ onDownArrowClick, setVehicle, pickup, destination, setShowConfirmRidePanel, coordinates, setFare }) => {

  const [confirm, setConfirm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [calculatedfare, setcalculatedFare] = useState({})


  const handleClick = async()=>{
    const response = await userApi.post(`/users/rides/fare`, {coordinates});
    console.log('fare,', response.data.data);
    setcalculatedFare(response.data.data)
    setFare(response.data.data)
    setShowButton(false)
     setConfirm(true);

  }

  const handleVehicleSelection = async(vehicleType)=>{
    console.log("values to be sent inside vehiclePanel", {coordinates, pickup, destination, vehicleType});
    const body = {coordinates, pickup, destination, vehicleType}
   const response = await userApi.post('/users/rides/create-ride', body)
   if(!response){
    console.log("Failed to send the request to create ride")
   }
  }

  if(!pickup || !destination){
    return (
      <div className='p-4 m-1 mt-6 border-2 border-gray-800 font-semibold'>
        <p>Please select pickUp and destination to continue</p>
      </div>
    )
  }

  if(pickup && destination){
    if(showButton){
      return(
      <button onClick={handleClick} className='px-6 py-2 bg-gray-800 text-white w-full mt-4'>Confirm</button>
    )
    }
    
  }
  
  if(confirm){
    return (
      <div className='p-5'>
        <div className="flex justify-center mb-2">
          <button
            onClick={()=>{onDownArrowClick(); setShowConfirmRidePanel(false)}}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <BsChevronCompactDown className='h-8 w-full'></BsChevronCompactDown>
          </button>
        </div>
        <h3 className='font-semibold text-xl mb-4'>Choose a vehicle</h3>
       
            {vehicles.map(vehicle => (
              <div 
                key={vehicle.id}
                className={`flex align-center justify-between px-5 py-2 border-2 border-gray-900 rounded-md mb-2 cursor-pointer hover:bg-gray-100}`}
                onClick={() =>{setVehicle(vehicle); setShowConfirmRidePanel(true); handleVehicleSelection(vehicle.name)}}
              >
                <img className={vehicle.id === 1 ? '[clip-path:inset(10%_30%_0_10%)] translate-y-[-10%] scale-[1.2]' : ''} height='20%' width='20%' src={vehicle.image} alt={`${vehicle.name} image`} />
                <div>
                  <div className='flex font-medium text-sm pt-2'>
                    <h4 className='mr-1'>{vehicle.name}</h4>
                    <FaUser className='pt-1 mt-1'></FaUser>
                    <h4>{vehicle.capacity}</h4>
                  </div>
                  <h5 className='font-medium text-xs'>{vehicle.eta}</h5>
                  <p className='font-medium text-xs'>{vehicle.description}</p>
                </div>
                <h2 className='text-xl font-semibold pt-2'>{calculatedfare[vehicle.name]}</h2>
              </div>
            ))}

      </div>
    )
  }
  
 
}

export default VehiclePanel