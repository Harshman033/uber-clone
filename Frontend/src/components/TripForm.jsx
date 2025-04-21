import React from 'react';
import { BsChevronCompactDown } from "react-icons/bs";

const TripForm = ({ 
  isExpanded, setIsExpanded, pickup,  setPickup, destination,  setDestination, setShowLocationPanel, setActiveField  }) => {
   return (
    <div>
         {isExpanded && (
              <div className="flex justify-center mb-2">
                <button
                  onClick={() => {setIsExpanded(false); setDestination(''); setPickup('') }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <BsChevronCompactDown className='h-8 w-full'></BsChevronCompactDown>
                </button>
              </div>
            )}
            <div className="flex flex-col gap-4 mt-4 w-full bg-white">
              <h4 className='text-2xl font-semibold'>Find a trip</h4>
              {!isExpanded && (<div className="line absolute h-16 w-[0.2rem] top-[45%] left-3 bg-gray-900"></div>)}
              <input
                type="text"
                placeholder="Add a pick-up location"
                className="bg-gray-100 px-8 py-2 rounded-md w-full"
                onFocus={() => {
                  setIsExpanded(true);
                  setShowLocationPanel(true);
                  setActiveField('pickup');
                }}
                onChange={(e) => setPickup(e.target.value)}
                value={pickup}
              />
              <input
                type="text"
                placeholder="Enter your destination"
                className="bg-gray-100 px-8 py-2 rounded-md w-full"
                onFocus={() => {
                  setIsExpanded(true);
                  setShowLocationPanel(true);
                  setActiveField('destination');
                }}
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
              />
            </div>
    </div>
   )
};

export default TripForm;