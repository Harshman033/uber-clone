import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import {AuthContext} from '../context/AuthContext';
import userApi from '../api/userApi';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthenticated} = useContext(AuthContext);

  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  const submitHandler = async(e)=>{
   e.preventDefault();
   const user = {email, password};

   await userApi.post('/users/login', user);

   const res = await userApi.get('/users/me');
   if(res.status === 200){
    setAuthenticated(true);
    const data = res.data;
    setUser(data.user);

    navigate('/user-home')

   }
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

        <Link to='/captain-login'  className=' flex justify-center items-center bg-white border border-black rounded p-2'> Login as Captain </Link>
      </form>
    </div>
    <div className='text-center'>
     Don't have an account? <Link to='/user-register' className='text-blue-700'> Register Now</Link>
    </div>
    </div>
    </div>
  )
}

export default UserLogin
