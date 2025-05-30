import { useState, createContext } from "react";

export const UserContext = createContext();


const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{user, setUser}}>
     {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
