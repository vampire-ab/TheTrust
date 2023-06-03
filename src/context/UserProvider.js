import { useState } from "react";
import { createContext } from "react";
const UserContext = createContext({});
export const UserProvider = ({children}) => {
  const [address, setAddress] = useState();
  const [user, setUser] = useState({}); 
  return (
    <UserContext.Provider value={{address, setAddress, user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;