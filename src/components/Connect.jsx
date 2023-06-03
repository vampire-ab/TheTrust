import React from 'react'
import {
    BsTwitter,
    BsInstagram,    
  } from "react-icons/bs";
  import { FiMail } from 'react-icons/fi';

const Connect = ({setCtr, name, twitter, instagram, mail, linkedin, prsnl, setTwitter, setInstagram, setMail, setLinkedin, setPrsnl}) => {    
    const handleSubmit = () => {
        setCtr(5);
    }
  return (
    <div className="border-t-4 border-indigo-600 overflow-hidden rounded shadow-lg">
      <h3 className="text-xl text-center mt-8 mb-8">
        Lets connect {name}
      </h3>
      <div className="px-4 flex items-center mb-4 justify-evenly">
        <BsTwitter className='text-3xl text-blue-600' />
        <input
          id="twitter"
          type="text"
          onChange={(e) => setTwitter(e.target.value)}
          className="border border-gray rounded w-3/4 p-3 text-center"
          placeholder="Twitter"
          autoComplete="off"
          value={twitter}
        />
      </div>
      <div className="px-4 flex items-center mb-4 justify-evenly">
        <FiMail className='text-3xl text-red-600' />     
        <input
          id="mail"
          type="text"
          onChange={(e) => setMail(e.target.value)}
          className="border border-gray rounded w-3/4 p-3 text-center"
          placeholder='E-Mail'
          autoComplete="on"
          value={mail}
        />
      </div>
      {/* <div className="px-4 flex items-center mb-4 justify-evenly">
        <BsLinkedin className='text-3xl text-blue-900' />
        <input
          id="linkedin"
          type="text"
          onChange={(e) => setLinkedin(e.target.value)}
          className="border border-gray rounded p-3 w-3/4 text-center"
          placeholder="LinkedIn"
          autoComplete="off"
          value={linkedin}
        />
      </div> */}
      <div className="px-4 flex items-center mb-4 justify-evenly">
        <BsInstagram className='text-3xl text-pink-600' />
        <input
          id="instagram"
          type="text"
          onChange={(e) => setInstagram(e.target.value)}
          className="border border-gray rounded p-3 w-3/4 text-center"
          placeholder="Instagram"
          autoComplete="off"
          value={instagram}
        />
      </div>
      {/* <div className="px-4 flex items-center mb-4 justify-evenly">
        <BsGlobe className='text-3xl text-gray-600' />
        <input
          id="prsnl"
          type="text"
          onChange={(e) => setPrsnl(e.target.value)}
          className="border border-gray rounded p-3 w-3/4 text-center"
          placeholder="Personal Web"
          autoComplete="off"
          value={prsnl}
        />
      </div> */}
      <div className="px-4 text-center mb-6 text-red-600">
        <button
          onClick={() => handleSubmit()}
          className="w-3/4 p-3 rounded bg-indigo-600 text-white"
        >
          Let's end it!
        </button>
        <div className="m-2">Let's make them trust you</div>
      </div>
    </div>
  )
}

export default Connect