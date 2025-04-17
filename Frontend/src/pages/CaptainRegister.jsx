import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import captainApi from '../api/captainApi';
import { CaptainAuthContext } from '../context/CaptainAuthContext'
import { CaptainContext } from '../context/CaptainContext';

function CaptainRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicle, setVehicle] =useState({ 
    color : '',
    plate : '',
    capacity : '',
    vehicleType : '',});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const {setAuthenticated} = useContext(CaptainAuthContext);
 const {setCaptain} = useContext(CaptainContext);
 const navigate = useNavigate();
  

const handleVehicleChange = (e) =>{
  e.preventDefault();
  const {name, value} = e.target;
  setVehicle((prevValue)=>({
    ...prevValue,
    [name] : value
  }))

}

  const submitHandler = async (e)=>{
   e.preventDefault();
   const newCaptain = {fullName:{
    firstName,
    lastName,
   },
   email,
   password,
   vehicle
  } 

  console.log(newCaptain)
   await captainApi.post('/captains/register', newCaptain );
   const res = await captainApi.get('/captains/me');

   if(res.status === 200){
    const data = res.data;
    setAuthenticated(true);
    setCaptain(data.captain);

    navigate('/captain-home')
   }
   setEmail('');
   setPassword('');
   setFirstName('');
   setLastName('');

  }

  return (
    <div className=' w-full h-full m-0 p-0  md:bg-black md:flex md:justify-center md:items-center'>
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
        <input required type="password" value={password} placeholder='password' className='bg-slate-100 rounded px-4 py-2 w-full mb-7 '
         onChange={(e)=>{
          setPassword(e.target.value)
        }} />

         <label htmlFor="" className='text-lg font-semibold'>Enter Vehicle Details : </label>
         <div className='flex gap-2 mb-2'>
         <input type="text" name="color" value={vehicle.color} onChange={handleVehicleChange} placeholder='Vehicle Color' className='bg-slate-100 rounded px-4 py-2 w-full '/>
         <input type="text" name="plate" value={vehicle.plate} onChange={handleVehicleChange} placeholder='Plate Number'className='bg-slate-100 rounded px-4 py-2 w-full'/>  
         </div>
       
        <div className='flex gap-2 mb-7'>
      <input  type="number"  name="capacity"  value={vehicle.capacity}  onChange={handleVehicleChange} placeholder='Seating Capacity'className='bg-slate-100 rounded px-2 py-2 w-full '/>
      <select name="vehicleType" value={vehicle.vehicleType} onChange={handleVehicleChange}>  
      <option value="">Select Vehicle Type</option>
      <option value="car">Car</option>
      <option value="bike">Bike</option>
      <option value="auto">Auto</option>
      </select>
        </div>

        <button className='bg-black text-white rounded p-2 mb-3' >Register</button>

        <Link to='/user-register'  className=' flex justify-center items-center bg-white border border-black rounded p-2'> Register as User </Link>
      </form>
    </div>
    <div className='text-center' >
     Already have an account? <Link to='/captain-login' className='text-blue-700'> Login Now</Link>
    </div>
    </div>
    </div>
  )
}

export default CaptainRegister
