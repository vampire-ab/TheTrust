import { ethers } from "ethers";
import abi from "../contract/ABI.json";
// Polygon Mumbai Contract TheTrust at: 0xFD074d5a94c4e451ff8E6fbA94FDBEed7451DFEF.
const GetContract = () => {
  if (window) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      "0xFD074d5a94c4e451ff8E6fbA94FDBEed7451DFEF",
      abi,
      provider
    );
    return contract;
  }
};
export default GetContract;
