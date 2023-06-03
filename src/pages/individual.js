import { useEffect, useState } from "react";
import {
  BsCheck2Circle,
  BsHeartFill,
  BsHeart,
  BsGlobe,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsFillTelephoneFill,
  BsChat,
  BsCameraVideo,
} from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { BiCopy } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import GetContract from "@/hooks/GetContract";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import abi from "../contract/ABI.json";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const Individual = () => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { query } = useRouter();
  const [donate, setDonate] = useState("");  
  const [recepient, setRecepient] = useState({});
  const [loc, setLoc] = useState([]);
  const [received, setReceived] = useState(1);
  const [required, setRequired] = useState(1);
  const [endorses, setEndorses] = useState(11);
  const [endorsed, setEndorsed] = useState(true);
  const percent = (received / required) * 100;
  const handleDonation = async () => {
    // await contract.connect();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(
      "0xFD074d5a94c4e451ff8E6fbA94FDBEed7451DFEF",
      abi,
      signer
    );
    const res = await contract.donate(recepient?.recepient, { value: donate });
    console.log(res);
  };
  useEffect(() => {
    const contract = GetContract();
    async function fetch() {
      try {
        const res1 = await contract.viewRecepient(query.address);
        console.log(res1);
        setRecepient(res1);
        setRequired(JSON.parse(res1?.required));
        setReceived(JSON.parse(res1?.received));
        setLoc([Number(res1?.location[0]), Number(res1?.location[1])]);
      } catch (e) {}
    }
    fetch();
  }, []);
  return (
    <div>
      <div className="flex h-screen max-w-full bg-gray-800 ">
        <div className="w-20 relative z-20 flex-shrink-0  px-2 overflow-y-auto bg-indigo-600 sm:block">
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-gray-300 border-2 border-white mt-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxhAxJ4D7MOeTTj6kR9PBeZonW5HM7giKjTbEmR-HMBwf3G1VqGnlwpO1kWrdyIZu8_U&usqp=CAU"
                  className="rounded-full w-auto"
                  alt="user"
                />
              </div>
            </div>
            <div>
              <ul className="mt-6 leading-10 px-4">
                <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-blue-400 cursor-pointer">
                  <i className="fas fa-align-left fa-sm text-white"></i>
                </li>
                <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-pink-400 cursor-pointer">
                  <i className="fas fa-question-circle fa-sm text-white"></i>
                </li>
                <li className="mb-3 p-2 rounded-md flex items-center justify-center bg-yellow-400 cursor-pointer">
                  <i className="fas fa-headphones fa-sm text-white"></i>
                </li>
                <li className="absolute bottom-0 mb-3 p-2 rounded-full flex items-center mx-auto bg-white cursor-pointer">
                  <i className="fas fa-power-off fa-sm text-indigo-600"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className=" w-52 relative z-0 flex-shrink-0 hidden px-4 overflow-y-auto bg-gray-100 sm:block "
          x-show="openMenu ==  1"
        >
          <div className="mb-6">
            <div className="grid gap-4 grid-cols-2 mt-6">
              <div
                title={recepient?.kyc ? "Verified" : "Unverified"}
                className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer"
              >
                <div
                  className={
                    "rounded-full p-1 flex flex-col items-center " +
                    (recepient?.kyc ? "bg-green-400" : "bg-red-400")
                  }
                >
                  <i className=""></i>
                </div>
                <p className="text-xs mt-1 text-center font-semibold">KYC</p>
              </div>
              <div
                title="Wallet Connected"
                className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer"
              >
                <div className="rounded-full p-1 flex flex-col items-center bg-green-400">
                  <i className=""></i>
                </div>
                <p className="text-xs mt-1 text-center font-semibold">Wallet</p>
              </div>
              {/* <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <div
                  className={
                    "rounded-full p-1 flex flex-col items-center bg-yellow-400"
                  }
                >
                  <i className=""></i>
                </div>
                <p className="text-xs mt-1 text-center font-semibold">
                  {affiliation === 2 ? "Agency" : "Individual"}
                </p>
              </div> */}
              <div className="p-2 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                <div
                  className={
                    "rounded-full p-1 flex flex-col items-center bg-slate-400"
                  }
                >
                  <i className=""></i>
                </div>
                <p className="text-xs mt-1 text-center font-semibold">
                  Recepient
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main className="relative z-0 flex-1 pb-8 px-6 bg-white">
            <div className="grid pb-8  mt-4 ">
              <div className="mb-1 p-4 ">
                <p className="text-2xl flex font-bold text-black pb-0">
                  {recepient?.name}{" "}
                  <span
                    onClick={() => setEndorsed(!endorsed)}
                    className="my-auto ml-3"
                  >
                    {endorsed ? (
                      <BsHeartFill
                        onClick={() => setEndorses(endorses - 1)}
                        title="Unendorse"
                        className={
                          "cursor-pointer text-base my-auto text-red-600"
                        }
                      />
                    ) : (
                      <BsHeart
                        onClick={() => setEndorses(endorses + 1)}
                        title="Endorse"
                        className={"cursor-pointer text-base my-auto"}
                      />
                    )}
                  </span>
                  <span className="text-base font-normal my-auto ml-2">
                    {endorses}
                  </span>
                </p>
                <div className="flex mt-3 space-x-4">
                  {recepient?.contact ? (
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(recepient?.contact);
                      }}
                      className="my-auto w-fit "
                    >
                      <BsFillTelephoneFill className="text-green-500" />
                    </div>
                  ) : (
                    <></>
                  )}
                  {recepient?.twitter ? (
                    <Link
                      className="my-auto"
                      href={{ pathname: recepient?.twitter }}
                    >
                      <BsTwitter className="text-blue-500" />
                    </Link>
                  ) : (
                    <></>
                  )}
                  {recepient?.instagram ? (
                    <Link
                      className="my-auto"
                      href={{ pathname: recepient?.instagram }}
                    >
                      <BsInstagram className="text-pink-500 font-bold" />
                    </Link>
                  ) : (
                    <></>
                  )}
                  {recepient?.mail ? (
                    <Link
                      className="my-auto"
                      href={{ pathname: recepient?.mail }}
                    >
                      <FiMail className="text-pink-500 font-bold" />
                    </Link>
                  ) : (
                    <></>
                  )}
                  {recepient?.kyc ? (
                    <div className="text-green-400 flex">
                      Verified User{" "}
                      <BsCheck2Circle className="my-auto ml-2 text-green-400" />
                    </div>
                  ) : (
                    <div className="text-red-400 flex">
                      Unverified User{" "}
                      <RxCrossCircled className="my-auto ml-2 " />
                    </div>
                  )}
                </div>
                <div className="flex justify-start items-center mt-3">
                  <span className="font-semibold mr-2">Ethereum Wallet:</span>{" "}
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(recepient?.recepient);
                    }}
                    className="flex cursor-pointer hover:text-gray-700"
                  >
                    {recepient?.recepient?.substring(0, 5).toLowerCase() +
                      "..." +
                      recepient?.recepient?.substring(38).toLowerCase()}
                    <BiCopy className="my-auto ml-2" />
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6 border-b-2 pb-4">
                <div className="col-span-12 sm:col-span-12 md:col-span-9">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 mt-3">
                    {/* <div className="p-4 flex gap-2 justify-center items-center">
                      <p className="text-lg font-bold pb-0">Age</p>
                      <p className="text-xs font-semibold pb-0 text-gray-400">
                        20
                      </p>
                    </div> */}
                    <div className="p-4 flex gap-2 justify-center items-center">
                      <p className="text-lg font-bold">Needs</p>
                      <p className="text-xs font-semibold text-gray-400">
                        {required}
                        {"  "}
                        <span>MATIC </span>
                      </p>
                    </div>
                    <div className="p-4 flex gap-2 justify-center items-center">
                      <p className="text-lg font-bold">Received</p>
                      <div className="w-full">
                        <p
                          className="text-sm text-gray-400"
                          style={{ marginLeft: `${percent - 5}%` }}
                        >
                          {percent}%
                        </p>
                        <div className="shadow w-full bg-gray-100 mt-2">
                          <div className="rounded leading-none h-3 flex text-center w-full text-white overflow-hidden">
                            <div
                              className={` rounded-l bg-green-400 h-full`}
                              style={{ width: `${percent}%` }}
                            ></div>
                            <div
                              className={` rounded-r bg-red-400 h-full`}
                              style={{ width: `${100 - percent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {recepient?.address !== address ? (
                      <div className="p-4 flex gap-2 justify-center items-center">
                        <input
                          type="number"
                          placeholder="10 Matic"
                          className="w-full p-2 border rounded focus:outline-none"
                          value={donate}
                          onChange={(e) => setDonate(e.target.value)}
                        />
                        <button
                          onClick={handleDonation}
                          className="bg-indigo-600 text-white py-2 px-5 rounded"
                        >
                          Donate
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="p-4 flex">
                      <div className="w-full flex"></div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-4 xxl:col-span-4"></div>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-3 mt-3">
                <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-gray-500">
                  <div className="absolute inset-0 bg-pink-900 bg-opacity-75 transition duration-300 ease-in-out"></div>
                  <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                    <div>
                      <h3 className="text-center text-white font-semibold text-xl">
                        {"Personal Story"}
                      </h3>
                      <h3 className="text-center text-white text-lg mt-2 font-semibold">
                        (Proof of Need)
                      </h3>
                      <div className="flex space-x-4 mt-4"></div>
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out">
                  {loc.length === 2 ? (
                    <div className="w-full h-full">
                      <Map
                        className="w-96 h-96"
                        location={loc}
                        user={recepient?.name}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out">
                  <div className="w-[400px] h-52">
                    <img
                      src={
                        "https://gateway.lighthouse.storage/ipfs/" +
                        recepient?.cid
                      }
                      alt={recepient?.cid}
                      className="h-full w-full object-center object-cover rounded"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {address !== recepient?.recepient ? (
        <div className="fixed bottom-3 right-5 mb-4 z-10">
          <div>
            <div
              title="Chat"
              className="cursor-pointer w-16 h-16 flex justify-center items-center rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
            >
              <BsChat
                className=" object-cover text-indigo-600 object-center w-10 h-10 transition-all duration-75 transform hover:scale-110 hover:rotate-12"
                alt="Chat"
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {recepient?.kyc === true && query.pathname !== "/create-stream" ? (
        <div className="fixed bottom-3 right-24 mb-4 z-10">
          <div className="">
            <Link
              href={{ pathname: "/create-stream" }}
              title="Stream Now"
              className="cursor-pointer peer w-16 h-16 flex flex-col ml-auto justify-center items-center rounded-full shadow transition-all hover:shadow-lg transform hover:scale-110 hover:-rotate-12"
            >
              <BsCameraVideo
                className=" object-cover text-indigo-600 object-center w-10 h-10 transition-all duration-75 transform hover:scale-110 hover:-rotate-12"
                alt="Stream Now"
              />
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Individual;
