import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'
import Land from './pages/Land'
import ProtectedRoute from './components/ProtectedWrapper'
import UserHome from './pages/UserHome'
import CaptainProtectedRoute from './components/CaptainProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
import RideDetails from './components/RideDetails'
import CaptainRiding from './pages/CaptainRiding'

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Land />} />
      <Route path='/user-home' element={<ProtectedRoute> <UserHome /> </ProtectedRoute>} />
      <Route path='/user-register' element={<UserRegister />} />
      <Route path='/user-login' element={<UserLogin />} />
      <Route path='/captain-register' element={<CaptainRegister />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/captain-home' element={<CaptainProtectedRoute> <CaptainHome />  </CaptainProtectedRoute>} />
      <Route path='/ride-map' element={<CaptainProtectedRoute> <CaptainRiding />  </CaptainProtectedRoute>} />
      </Routes>
     
    </div>
  )
}

export default App
