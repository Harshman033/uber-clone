import React from 'react'
import { Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'

function App() {
  return (
    <div>
      <Routes to='/' element={<Home />} />
      <Routes to='/user-register' element={<UserRegister />} />
      <Routes to='/user-login' element={<UserLogin />} />
      <Routes to='/captain-register' element={<CaptainRegister />} />
      <Routes to='/captain-login' element={<CaptainLogin />} />
    </div>
  )
}

export default App
