import React ,{useState, useEffect, useRef} from 'react'
import { BsChevronCompactDown } from "react-icons/bs";
import { RiMapPinRangeFill } from "react-icons/ri";
import { IoIosSquare } from "react-icons/io";
import { BsCreditCardFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { PiSeatbeltFill } from "react-icons/pi";
import OtpVerificationModal from './OtpVerificationModal';

const FinishRide = ({setFinishRidePanel}) => {
 
   const pickup = "london";
   const destination = "NY";
   const price = "45";
   
   return (
      <div className="p-5 pt-0">
        <div className="flex justify-center">
                  <button
                    onClick={()=>{setFinishRidePanel(false)}}
                    className=" rounded-full hover:bg-gray-100"
                  >
                    <BsChevronCompactDown className='h-7 mb-2 w-full'></BsChevronCompactDown>
                  </button>
                </div>
        <h3 className='text-xl font-semibold mb-4'>Finish this Ride</h3>
        <div className='flex justify-between p-4 bg-yellow-400'>
            <div className='flex px-4'>
                <div className='flex gap-2'>
                <PiSeatbeltFill className='h-8 w-8 '></PiSeatbeltFill>
                <h2 className='text-lg font-semibold'>Passenger Name</h2>
                </div>
            </div>
            <h2 className='text-lg font-semibold'>2.2 kms</h2>
        </div>
        <div className='w-full mb-4'>
          <hr className="my-2" />
          <div className='flex px-2 py-2'>
            <RiMapPinRangeFill className="mt-1 mr-2 text-gray-700" />
            <div>
              <h2 className='font-semibold'>{pickup}</h2>
              <h3 className='text-gray-700 text-sm'>Pick-up location</h3>
            </div>
          </div>
          <hr className="my-2" />
          <div className='flex px-2 py-2'>
            <IoIosSquare className="mt-1 mr-2 text-gray-700" />
            <div>
              <h2 className='font-semibold'>{destination}</h2>
              <h3 className='text-gray-700 text-sm'>Drop-off location</h3>
            </div>
          </div>
          <hr className="my-2" />
          <div className='flex px-2 py-2'>
            <BsCreditCardFill className="mt-1 mr-2 text-gray-700" />
            <div>
              <h2 className='font-semibold'>${price || "67"}</h2>
              <h3 className='text-gray-700 text-sm'>cash</h3>
            </div>
          </div>
          <hr className="my-2" />
        </div>
      <div className='flex justify-center w-full mt-4'>
        <Link to='/captain-home' className='w-full'><button className=' w-full bg-green-500 text-white py-3 border-none rounded-md font-bold'> Finish Ride</button> </Link>
      </div>
      <p className='text-red-400 text-sm text-center'>Click on finish ride button if you have completed the payment</p>
       
        </div>
    )
}

export default FinishRide
