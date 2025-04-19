import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({ onLocationSelect }) => {
  const locations = ["Rajendra market", "City Mall", "City park", "National college", "City hospital", "Rajendra market", "City Mall", "City park",]
  return (
    <div>
      <ul className="space-y-2">
      {locations.map((location, index)=>(
           <li key={index} className="p-1 border rounded-md cursor-pointer hover:bg-gray-100 flex items-center"
           onClick={() => onLocationSelect(location)}>
           <FaLocationDot className="mr-2 text-gray-600" /> {location}
         </li>
        ))}
      </ul>
    </div>
  )
}

export default LocationSearchPanel