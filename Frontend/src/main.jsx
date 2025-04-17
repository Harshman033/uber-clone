import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContextProvider from './context/UserContext.jsx'
import AuthProvider from './context/AuthContext.jsx'
import CaptainContextProvider from './context/CaptainContext.jsx'
import CaptainAuthProvider from './context/CaptainAuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CaptainAuthProvider>
        <UserContextProvider>
      <CaptainContextProvider>
        <BrowserRouter>
    <App />
    </BrowserRouter>
      </CaptainContextProvider>
    </UserContextProvider>
      </CaptainAuthProvider>
    
    </AuthProvider>
  </StrictMode>,
)
