import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaLocationDot } from "react-icons/fa6";
import mapApi from '../api/mapApi';

const LocationSearchPanel = ({ onLocationSelect, pickup, destination, activeField }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{
    const query = activeField === 'pickup' ? pickup : destination;

    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController;
    const timeoutId = setTimeout(async()=>{
      try {
        console.log(query)
        const response = await mapApi.get(`/maps/locationDetails?query=${query}`);
        console.log("response.data", response.data)
        console.log("response.data.data", response.data.data)
        setSuggestions( response.data.data);
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
  return (
    <div>
      <ul className="space-y-2">
      {suggestions.map((location, index)=>(
           <li key={index} className="p-1 border rounded-md cursor-pointer hover:bg-gray-100 flex items-center"
           onClick={() => onLocationSelect(location)}>
           <FaLocationDot className="mr-2 text-gray-600" /> {location.name}
         </li>
        ))}
      </ul>
    </div>
  )
}

export default LocationSearchPanel