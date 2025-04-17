import { createContext, useState, useEffect } from "react";
import captainApi from "../api/captainApi";

export const CaptainAuthContext = createContext();

const CaptainAuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const checkAuth = async() => {
            try {
                 const res = await captainApi.get('/captains/me');
                 if(res.status===200)setAuthenticated(true) ;
            } catch (error) {
                console.log(error?.message || 'something went wrong inside CaptainAuth when fetching /me');
                setAuthenticated(false)
            }finally {
                setLoading(false);
            }
        }
        checkAuth();
       
    },[]);
    const value = {authenticated, setAuthenticated, loading}

    return (
        <CaptainAuthContext.Provider value={value}>
            {children}
        </CaptainAuthContext.Provider>
    )
}

export default CaptainAuthProvider