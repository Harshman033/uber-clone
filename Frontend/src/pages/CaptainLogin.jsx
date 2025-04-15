import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function CaptainLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] =useState({});
  

  const submitHandler = (e)=>{
   e.preventDefault();
   setCaptainData({email, password})
  }
  return (
    <div className=' w-full h-full m-0 p-0  md:bg-black md:flex md:justify-center md:items-center'>
    <div className='flex flex-col justify-between p-7 h-screen bg-white md:w-1/3'>
      <div  >
      <Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16 h-auto mt-4  mb-8' /></Link>
      <form action="submit" onSubmit={submitHandler} className='flex flex-col justify-between'>

        <label htmlFor="" className='text-lg font-semibold'>Enter your email</label>
        <input required type="email" value={email} placeholder='email@example.com' className='bg-slate-100 rounded px-4 py-2 w-full mb-7 '
         onChange={(e)=>{
          setEmail(e.target.value)
        }}
        />

        <label htmlFor="" className='text-lg font-semibold'>Enter your password</label>
        <input required type="password" value={password} placeholder='password' className='bg-slate-100 rounded px-4 py-2 w-full mb-9 '
         onChange={(e)=>{
          setPassword(e.target.value)
        }} />

        <button className='bg-black text-white rounded p-2 mb-3' >Login</button>

        <Link to='/user-login'  className=' flex justify-center items-center bg-white border border-black rounded p-2'> Login as User </Link>
      </form>
    </div>
    <div className='text-center'>
     Don't have an account? <Link to='/captain-register' className='text-blue-700'> Register Now</Link>
    </div>
    </div>
    </div>
  )
}

export default CaptainLogin
