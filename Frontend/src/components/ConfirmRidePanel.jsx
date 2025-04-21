import React from 'react'
import { BsChevronCompactDown } from "react-icons/bs";
import { RiMapPinRangeFill } from "react-icons/ri";
import { IoIosSquare } from "react-icons/io";
import { BsCreditCardFill } from "react-icons/bs";

const ConfirmRidePanel = ({ setShowConfirmRidePanel, pickup, destination, vehicle, setLookingForDriverPanel}) => {
  return (
    <div className="p-5">
      <div className="flex justify-center mb-2">
        <button
          onClick={()=>{setShowConfirmRidePanel(false)}}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <BsChevronCompactDown className='h-8 w-full'></BsChevronCompactDown>
        </button>
      </div>
      <h3 className='text-xl font-semibold mb-4'>Confirm your ride</h3>
      <div className='flex justify-evenly flex-col items-center mb-4'>
        <img height='20%' width="40%" src={vehicle?.image || "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"} alt="uber ride pic" />
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
            <h2 className='font-semibold'>${vehicle?.price || "67"}</h2>
            <h3 className='text-gray-700 text-sm'>cash</h3>
          </div>
        </div>
        <hr className="my-2" />
      </div>
      <button onClick={()=>{setLookingForDriverPanel(true)}} className='w-full bg-green-600 text-white py-3 border-none rounded-md font-bold'>Confirm</button>
    </div>
  )
}

export default ConfirmRidePanel