import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsChevronCompactUp } from "react-icons/bs";
import FinishRide from '../components/FinishRide';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(function() {
    if(finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        y: 0
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        y: '100%'
      });
    }
  }, [finishRidePanel]);
  return (
    <div className='h-screen relative'>
      
      <Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16 absolute left-5 top-5' /></Link>
      <div className='h-4/5'>
        <img className='w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rbrCDbss3kRmbeiZoslsXiTdENOYg9iXCA&s" alt="map img" />
      </div>
      <div className=' h-1/5 p-5 bg-yellow-400'>
      <div className="flex justify-center">
                <button onClick={()=>{setFinishRidePanel(true)}}>
                  <BsChevronCompactUp className='h-7 w-full'></BsChevronCompactUp>
                </button>
                </div>
                <div className='flex justify-around items-center pt-4'>
                <h2 className='font-bold text-xl'>4 Kms away</h2>
          <button onClick={()=>{setFinishRidePanel(true)}} className='px-12 py-3 text-white bg-green-500 rounded-md font-bold'>Confirm Ride</button>
                </div>
         
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <FinishRide {...{setFinishRidePanel}} /></div>
      
    </div>
  )
}

export default CaptainRiding
