import { useState } from "react";
import { createContext } from "react";
const UserContext = createContext({});
export const UserProvider = ({children}) => {
  const [address, setAddress] = useState();  
  return (
    <UserContext.Provider value={{address, setAddress}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;