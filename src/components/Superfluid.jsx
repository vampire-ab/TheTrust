import { ethers } from "ethers";
import React from "react";
import { useSigner } from "wagmi";
import abi from "../contract/Superfluid.json";
const Superfluid = () => {
  const { data: signer } = useSigner();
  const superfluid = new ethers.Contract(
    "0x021477F63cc930065777c62e17311d7aB07510E1",
    abi,
    signer
  );
  console.log(superfluid);
  const createFlow = async () => {
    const res = await superfluid.createStream('0xF83BFfa33a6881CB6E23AB256c7F8D8b1c0db52D', 1);
    res.wait();
    console.log(res);
  };
  const deleteFlow = async () => {
    const res = await superfluid.deleteStream('0xF83BFfa33a6881CB6E23AB256c7F8D8b1c0db52D', 1);
    res.wait(2);
    console.log(res);
  };
  return (
    <div>
      <button className="" onClick={() => createFlow()}>
        Create Flow
      </button>
      <button className="" onClick={() => deleteFlow()}>
        Delete Flow
      </button>
    </div>
  );
};

export default Superfluid;
