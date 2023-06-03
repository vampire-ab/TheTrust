import { useState } from "react";
import { createContext } from "react";
// import { useContract } from "wagmi";
// const signer = new ethers.providers
const DeployedContractContext = createContext({});

export const ContractProvider = ({children}) => {
  
  const [contract, setContract] = useState();
  return (
    <DeployedContractContext.Provider value={{contract, setContract}}>
      {children}
    </DeployedContractContext.Provider>
  )
}

export default DeployedContractContext;