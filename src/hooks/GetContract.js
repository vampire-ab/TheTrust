import { ethers } from "ethers";
import abi from "../contract/ABI.json";
// Polygon Mumbai Contract TheTrust at: 0xacBF7eAA5bF7c3B52401327edeAc5D8936e45606.
const GetContract = () => {
  if (window) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      "0xacBF7eAA5bF7c3B52401327edeAc5D8936e45606",
      abi,
      provider
    );
    return contract;
  }
};
export default GetContract;
