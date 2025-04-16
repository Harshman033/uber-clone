import React from 'react'
import { Link } from 'react-router-dom'

function Land() {
  return (
    <div className=' w-full h-full m-0 p-0  md:bg-black md:flex md:justify-center md:items-center'>
      <div className=" md:w-1/3 bg-cover bg-center h-screen w-full flex flex-col justify-between pt-8 bg-slate-600 bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)]">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className="w-14 ml-8" />
        <div className='bg-white py-5 px-8 pb-8'>
          <h2 className='text-2xl font-bold '>Get Started With Uber</h2>
          <Link to='/user-login' className='flex justify-center items-center bg-black text-white py-3 rounded mt-8 w-full'>Continue</Link> 
        </div>
      </div>
    </div>
  )
}

export default Land
