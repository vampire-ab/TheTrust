import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import("./Profile"), {
  ssr: false,
});

const Navbar = () => {
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
                  TheTrust
                </div>
              </Link>
              <div className="">
                Made with ❤️ for Alchemy
              </div>
              <div className="hidden xl:flex space-x-5 items-center">
                <Profile />
              </div>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
