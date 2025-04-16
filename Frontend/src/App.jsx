import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'
import Land from './pages/Land'
import ProtectedRoute from './components/ProtectedWrapper'

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Land />} />
      <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      <Route path='/user-register' element={<UserRegister />} />
      <Route path='/user-login' element={<UserLogin />} />
      <Route path='/captain-register' element={<CaptainRegister />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      </Routes>
     
    </div>
  )
}

export default App
