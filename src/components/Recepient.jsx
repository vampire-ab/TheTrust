import React, { useState } from "react";

const Recepient = ({
  setCtr,
  setContact,
  setName,
  setDob,
  setStory,
  name,
  contact,
  dob,
  story,
  need,
  setNeed,
}) => {
  const [dd, setDd] = useState(dob ? dob.split("/")[0] : "");
  const [mm, setMm] = useState(dob ? dob.split("/")[1] : "");
  const [yy, setYy] = useState(dob ? dob.split("/")[2] : "");
  const [code, setCode] = useState(contact ? contact.split("-")[0] : "");
  const [number, setNumber] = useState(contact ? contact.split("-")[1] : "");
  const date = new Date();
  function handleSubmit() {
    setDob(dd + "/" + mm + "/" + yy);
    setContact(code + "-" + number);
    setCtr(3);
  }
  return (
    <div className="border-t-4 border-indigo-600 overflow-hidden rounded shadow-lg">
      <h3 className="text-xl text-center mt-8 mb-8">
        Honesty is the best policy!
      </h3>
      <div className="px-4 mb-4">
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border border-gray rounded w-full p-3 text-center"
          placeholder="Full Name"
          autoComplete="off"
          value={name}
        />
      </div>
      <div className="px-4 mb-4">
        <input
          id="need"
          type="number"
          onChange={(e) => setNeed(e.target.value)}
          className="border border-gray rounded w-full p-3 text-center"
          placeholder="Need in Wei"
          autoComplete="off"
          value={need}
        />
      </div>
      <div className="px-4 mb-4 flex items-center">
        <div className="w-5/12 text-center font-semibold">Date of Birth</div>
        <input
          id="dd"
          type="text"
          onChange={(e) => setDd(e.target.value)}
          className="border border-gray rounded w-1/5 p-3 text-center"
          placeholder={`${date.getDate()}`}
          autoComplete="off"
          value={dd}
        />
        <div className="m-1">/</div>
        <input
          id="mm"
          type="text"
          onChange={(e) => setMm(e.target.value)}
          className="border border-gray rounded w-1/5 p-3 text-center"
          placeholder={`${date.getMonth() + 1}`}
          autoComplete="off"
          value={mm}
        />
        <div className="m-1">/</div>
        <input
          id="yy"
          type="text"
          onChange={(e) => setYy(e.target.value)}
          className="border border-gray rounded w-1/5 p-3 text-center"
          placeholder={`${date.getFullYear()}`}
          autoComplete="off"
          value={yy}
        />
      </div>
      <div className="px-4 mb-4">
        <input
          title="Country Code"
          id="code"
          type="text"
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray rounded w-3/12 p-3 text-center"
          placeholder="+91"
          autoComplete="off"
          value={code}
        />
        <input
          title="Contact Number"
          id="number"
          type="text"
          onChange={(e) => setNumber(e.target.value)}
          className="border border-gray rounded p-3 w-9/12 text-center"
          placeholder="Contact"
          autoComplete="off"
          value={number}
        />
      </div>
      <div className="px-4 mb-4">
        <textarea
          id="story"
          type="text"
          onChange={(e) => setStory(e.target.value)}
          className="border border-gray rounded w-full p-3 text-center"
          placeholder="Your Story"
          autoComplete="off"
          value={story}
        />
      </div>
      <div className="px-4 text-center mb-6 text-red-600">
        <button
          onClick={() => handleSubmit()}
          className="w-full p-3 rounded bg-indigo-600 text-white"
        >
          Next
        </button>
        <div className="m-2">Let's tell the world who you are!</div>
      </div>
    </div>
  );
};

export default Recepient;
