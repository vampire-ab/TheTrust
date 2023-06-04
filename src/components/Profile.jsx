import React from "react";
import { useAccount, useConnect } from "wagmi";
import { FiCopy } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import Router from "next/router";
import GetContract from "@/hooks/GetContract";
const Profile = () => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const contract = GetContract();
      const acc = await contract.viewRecepient(address);
      console.log(acc);
      if (acc.recepient === "0x0000000000000000000000000000000000000000")
        Router.push("/SignUp");
      else Router.push(`/individual`, { query: { address: acc.recepient } });
    } catch (e) {
      console.log(e);
      window.alert("Change Network to POLYGON mumbai");
    }
  };
  return (
    <>
      {isConnected ? (
        <div className="flex gap-2 cursor-pointer">
          <div onClick={(e) => handleClick(e)} className="my-auto">
            <BiUserCircle className="text-2xl" />
          </div>
          <button className="flex gap-2">
            {address.substring(0, 8) + "...." + address.substring(35)}
            <FiCopy className="my-auto" />
          </button>
        </div>
      ) : (
        connectors.map((connector, idx) => {
          if (idx === 0)
            return (
              <button
                disabled={!connector.ready}
                onClick={() => connect({ connector })}
              >
                Connect Wallet
              </button>
            );
          return <></>;
        })
      )}
    </>
  );
};

export default Profile;
