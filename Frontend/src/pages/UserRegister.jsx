import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import userApi from '../api/userApi';
import { AuthContext } from '../context/AuthContext';

function UserRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const {setUser} = useContext(UserContext);
  const {setAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  

  const submitHandler = async(e)=>{
   e.preventDefault();
   const newUser = {
    fullName : {
      firstName :firstName,
      lastName : lastName
      },
     email,
     password
    };
    
  console.log(newUser)
    await userApi.post('/users/register', newUser);

    const res = userApi.get('/users/me')

    if(res.status === 200){
     const data = res.data;
     setUser(data.user)
     setAuthenticated(true)
     navigate('/user-home')
    }

   setEmail('');
   setPassword('');
   setFirstName('');
   setLastName('');
  }
  return (
    <div className='w-full h-full m-0 p-0  md:bg-black md:flex md:justify-center md:items-center'>
    <div className='flex flex-col justify-between p-7 h-screen bg-white'>
      <div  >
      <Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16 h-auto mt-4  mb-8' /></Link> 
      <form action="submit" onSubmit={submitHandler} className='flex flex-col justify-between'>

         
        <label htmlFor="" className='text-lg font-semibold'>Enter your name</label>
        <div className='flex gap-1' > 
        <input required type="text" value={firstName} placeholder='first name' className='bg-slate-100 rounded px-4 py-2 w-full mb-7 '
         onChange={(e)=>{
          setFirstName(e.target.value)
        }}
        />
        <input required type="text" value={lastName} placeholder='last name' className='bg-slate-100 rounded px-4 py-2 w-full mb-7 '
         onChange={(e)=>{
          setLastName(e.target.value)
        }}
        /></div>

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

        <button className='bg-black text-white rounded p-2 mb-3' >Register</button>

        <Link to='/captain-register'  className=' flex justify-center items-center bg-white border border-black rounded p-2'> Register as Captain </Link>
      </form>
    </div>
    <div className='text-center' >
     Already have an account? <Link to='/user-login' className='text-blue-700'> Login Now</Link>
    </div>
    </div>
    </div>
  )
}

export default UserRegister
