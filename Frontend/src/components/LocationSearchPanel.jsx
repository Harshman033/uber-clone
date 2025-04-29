import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({ onLocationSelect, pickup, destination }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{

    if(pickup.length<2){
      setSuggestions([]);
      return;
    }
    const controller = new AbortController;
    const timeoutId = setTimeout(async()=>{
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${pickup||destination}`, {
          params : {
            format : 'json',
            limit : 5
          },
          signal : controller.signal,
        });
        console.log(response.data)
        setSuggestions(response.data);
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Request Canceled :', error.message);
        }else{
          console.log("Failed to fetch locations :", error)
        }
      }
    },500)

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    }

  },[pickup, destination])
  const location = ["Rajendra market", "City Mall", "City park", "National college", "City hospital", "Rajendra market", "City Mall", "City park",]
  return (
    <div>
      <ul className="space-y-2">
      {suggestions.map((location, index)=>(
           <li key={index} className="p-1 border rounded-md cursor-pointer hover:bg-gray-100 flex items-center"
           onClick={() => onLocationSelect(location.display_name)}>
           <FaLocationDot className="mr-2 text-gray-600" /> {location.display_name}
         </li>
        ))}
      </ul>
    </div>
  )
}

export default LocationSearchPanel