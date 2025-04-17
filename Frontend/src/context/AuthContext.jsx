import React , {createContext, useState, useEffect} from 'react'
import userApi from '../api/userApi';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
const [authenticated, setAuthenticated] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(()=>{
    const checkAuth = async () =>{
        try {
            const response = await userApi.get('/users/me');
            console.log('Auth response:', response);
            setAuthenticated(true);
        } catch (error) {
            console.log(error?.message || "something went wrong inside authContext when fetching /me")
            setAuthenticated(false);
        } finally{
            setLoading(false)
        }
    }
    checkAuth();
},[]);

const value = {authenticated, setAuthenticated, loading};

  return (
   <AuthContext.Provider value={value}>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider
