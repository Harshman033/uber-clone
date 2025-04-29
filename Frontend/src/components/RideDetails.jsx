import React, {useState, useRef, useEffect} from 'react'
import { BsChevronCompactDown } from "react-icons/bs";
import { RiMapPinRangeFill } from "react-icons/ri";
import { IoIosSquare } from "react-icons/io";
import { BsCreditCardFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { PiSeatbeltFill } from "react-icons/pi";
import OtpVerificationModal from './OtpVerificationModal';

const RideDetails = ({ onCancel }) => {
  const [verified, setVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
   const pickup = "london";
   const destination = "NY";
   const price = "45";
   
   return (
      <div className="p-5">
        
        <h3 className='text-xl font-semibold mb-4'>Ride Details</h3>
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
        <div className='text-center'>
        <button
        onClick={() => setShowModal(true)}
        className="  p-2 px-4 m-5 font-medium bg-yellow-400 rounded-lg  "
      >
        Verify OTP
      </button>
      
      {showModal && <OtpVerificationModal onClose={() => setShowModal(false)} verified={verified}  setVerified={setVerified} />}
        </div>
        <div className='flex justify-center gap-6'>
          {verified? 
          <Link to='/ride-map'>
          <button className='px-12 bg-yellow-400 py-3 border-none rounded-md font-bold'>
            Go to pickup
          </button>
        </Link>
        :
        <div className='px-12 bg-gray-400 text-gray-600 py-3 border-none rounded-md font-bold'>  Go to pickup </div>
        }
          
          <button onClick={onCancel} className='px-12 py-3 border-2 text-gray-800 border-gray-800 rounded-md font-bold'>
            Cancel
          </button>
        </div>
      </div>
    )
}

export default RideDetails