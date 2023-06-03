import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useBalance } from "wagmi";
import Router from "next/router";
import abi from "../contract/ABI.json";

export default function Home() {
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address: "0xFD074d5a94c4e451ff8E6fbA94FDBEed7451DFEF",
  });
  const [recepients, setRecepients] = useState([]);
  const [bal, setBal] = useState();
  const [donation, setDonation] = useState("");
  const donateToPool = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(
      "0xFD074d5a94c4e451ff8E6fbA94FDBEed7451DFEF",
      abi,
      signer
    );
    const donate = await contract.donateToPool({
      value: ethers.utils.formatUnits(donation, "wei"),
    });
    donate.wait();
    console.log(donate);
  };
  useEffect(() => {
    let balann;
    if (balance) balann = BigInt(balance?.value);
    else balann = 0;
    setBal(balann.toString());

    async function fetch() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(
        "0xFD074d5a94c4e451ff8E6fbA94FDBEed7451DFEF",
        abi,
        signer
      );
      let addresses = [];
      try {
        let i = 0;
        while (true) {
          const res = await contract.addresses(i);
          console.log(res);
          addresses.push(res);
          i++;
          if (i >= 8) break;
        }
      } catch (e) {}
      try {
        setRecepients([]);
        console.log("here");
        for (let i = 0; i < addresses.length; i++) {
          const res1 = await contract.viewRecepient(addresses[i]);
          // console.log(res1);
          setRecepients((old) => {
            return [...old, res1];
          });
        }
      } catch (e) {}
    }
    fetch();
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="p-3 items-center justify-center flex w-full">
        <div className="border-t-4 w-10/12 border-indigo-600 overflow-hidden rounded shadow-lg">
          <h3 className="text-xl text-center mt-8 mb-8">
            We thrive on <span className="font-bold text-amber-300">TRUST</span>
          </h3>
          <div className="px-4 mb-4 mx-auto w-fit">
            <div className="text-3xl text-center w-full m-2">RECEPIENTS</div>
            <div className="border border-gray rounded w-full p-3 text-center space-x-3 justify-center items-center">
              <p className="">
                Don't know where to donate. Donate directly to the pool.
              </p>
              <p>Pool Balance: {bal}</p>
              <input
                id="donation"
                type="number"
                onChange={(e) => setDonation(e.target.value)}
                className="border border-gray rounded w-1/2 p-3 text-center"
                placeholder="Donate in WEI"
                autoComplete="off"
                value={donation}
              />
              <button
                onClick={() => donateToPool()}
                className="p-2 text-white rounded bg-indigo-600"
              >
                Donate
              </button>
            </div>
            {recepients?.map((recepient, idx) => {
              // const tmp = {
              //   required: JSON.parse(recepient.required),
              //   received: JSON.parse(recepient.received),
              //   kyc: recepient.kyc,
              //   name: recepient.name,
              //   dob: recepient.dob,
              //   contact: recepient.contact,
              //   story: recepient.story,
              //   location: recepient.location,
              //   twitter: recepient.twitter,
              //   mail: recepient.mail,
              //   instagram: recepient.instagram,
              //   cid: recepient.cid,
              // };
              // console.log(tmp);
              return (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Router.push({
                      pathname: `/individual`,
                      query: { address: recepient.recepient },
                    });
                  }}
                  // href={{
                  //   pathname: `/individual`,
                  //   query: recepient,
                  // }}
                  key={idx}
                  className="border border-gray rounded w-full p-3 text-center flex space-x-3 flex-wrap justify-center items-center"
                >
                  <div className="p-1 ">Name: {recepient.name}</div>
                  <div className="p-1 ">
                    Needs: {JSON.parse(recepient.required)} matic
                  </div>
                  <div className="p-1 ">
                    Received: {JSON.parse(recepient.received)}
                  </div>
                  {/* <div className="p-1 ">
                    Affiliation:{" "}
                    {JSON.parse(recepient[10]) === 1 ? "Individual" : "Agency"}
                  </div> */}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
