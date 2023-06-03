import React, { useState } from "react";
import { BsCameraVideo, BsFillChatFill } from "react-icons/bs";
import useUser from "../hooks/useUser";
// import Finder from "./Finder";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import("./Profile"),  {
  ssr: false,
});

const Navbar = () => {
  const { query } = useRouter();
  const [account, setAccount] = useState();
  const { user } = useUser();
  const handleSubmit = () => {};

  return (
    <div className="bg-indigo-600 w-full">
      <div className="flex flex-wrap place-items-center w-full">
        <section className="relative mx-auto w-full">
          {/* <!-- navbar --> */}
          <nav className="flex justify-between text-white w-full">
            <div className="px-5 xl:px-12 py-6 flex justify-between w-full items-center">
              <Link href={{ pathname: "/" }}>
                <div className="text-3xl font-bold font-heading">
                  {/* <!-- <img className="h-9" src="logo.png" alt="logo"> --> */}
                  Logo
                </div>
              </Link>
              <div className="text-black">
                <label>
                  <input
                    className="rounded px-2 py-1 focus:outline-none"
                    placeholder="Search"
                    onSubmit={handleSubmit}
                  ></input>
                </label>
              </div>
              <div className="hidden xl:flex space-x-5 items-center">
                {user ? (
                  <Link href={{ pathname: "/individual" }}>
                    <section className="flex items-center hover:text-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 hover:text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </section>
                  </Link>
                ) : (
                  // <Link href={{ pathname: "/SignUp" }}>
                  //   <div>Create Account</div>
                  // </Link>
                  <Profile />
                )}
              </div>
            </div>
          </nav>
        </section>
      </div>
      {user?.kyc === undefined && query.pathname !== "/create-stream" ? (
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
      {}
    </div>
  );
};

export default Navbar;
