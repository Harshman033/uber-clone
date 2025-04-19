import React from 'react'
import { BsChevronCompactDown } from "react-icons/bs";
import { RiUser3Fill } from "react-icons/ri";


const VehiclePanel = ({ onDownArrowClick }) => {
  return (
    <div  className='fixed z-10 p-5  '>
      <button onClick={onDownArrowClick}><BsChevronCompactDown className='h-8 top-0 w-full absolute'></BsChevronCompactDown></button>  
        <h3 className='font-semibold text-xl mb-4'>Choose a vehicle</h3>
       <div className='flex align-center justify-between px-5 py-2 border-2 border-gray-900 rounded-md mb-2'>
        <img className='[clip-path:inset(10%_30%_0_10%)] translate-y-[-10%] scale-[1.2] mr-1' height='20%' width='20%' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car image" />
        <div>
        <div className='flex font-medium text-sm pt-2'>
        <h4 className='mr-1'>UberGo</h4>
        <RiUser3Fill className='mt-1'></RiUser3Fill>
        <h4>4</h4>
         </div> 
        <h5 className='font-medium text-xs'>Two minutes away</h5>
        <p className=' font-medium text-xs'>Affordable, compact rides</p>
       </div>
          <h2 className='text-xl font-semibold pt-2'>$67</h2>
      </div>
      <div className='flex align-center justify-between px-5 py-2 border-2 border-gray-900 rounded-md mb-2'>
        <img className='mr-2' height='20%' width='20%' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="car image" />
        <div>
        <div className='flex font-medium text-sm pt-2'>
        <h4 className='mr-1'>UberGo</h4>
        <RiUser3Fill className='mt-1'></RiUser3Fill>
        <h4>1</h4>
         </div> 
        <h5 className='font-medium text-xs'>Three minutes away</h5>
        <p className=' font-medium text-xs'>Affordable motorcycle rides</p>
       </div>
          <h2 className='text-xl font-semibold pt-2'>$67</h2>
      </div>
      <div className='flex align-center justify-between px-5 py-2 border-2 border-gray-900 rounded-md mb-2'>
        <img className='' height='20%' width='15%' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="car image" />
        <div>
        <div className='flex font-medium text-sm pt-2'>
        <h4 className='mr-1'>UberAuto</h4>
        <RiUser3Fill className='mt-1'></RiUser3Fill>
        <h4>3</h4>
         </div> 
        <h5 className='font-medium text-xs'>Three minutes away</h5>
        <p className=' font-medium text-xs'>Affordable auto rides</p>
       </div>
          <h2 className='text-xl font-semibold pt-2'>$67</h2>
      </div>
      
    </div>
  )
}

export default VehiclePanel
