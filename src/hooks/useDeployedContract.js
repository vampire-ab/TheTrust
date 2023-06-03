import { useContext } from "react";
import DeployedContractContext from "../context/ContractProvider";
const useDeployedContract = () => {
  return useContext(DeployedContractContext);
}

export default useDeployedContract;