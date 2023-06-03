import React from "react";

const Affiliation = ({ setCtr, setAffiliation }) => {
  function handleSubmit(num) {
    setAffiliation(num);
    setCtr(2);
  }
  return (
    <div className="border-t-4 border-indigo-600 overflow-hidden rounded shadow-lg">
      <h3 className="text-xl text-center mt-8 mb-8">Let's be honest!</h3>
      <div className="px-4 mb-4">
        <button
          onClick={() => handleSubmit(1)}
          className="border border-gray rounded w-full p-3 text-center hover:bg-indigo-600 hover:text-white"
        >
          Individual
        </button>
      </div>
      <div className="px-4 mb-4">
        <button
          onClick={() => handleSubmit(2)}
          className="border border-gray rounded w-full p-3 text-center hover:bg-indigo-600 hover:text-white"
        >
          Agency
        </button>
      </div>
      <div className="px-4 mb-6 text-red-600">
        Recepient has to provide complete details for transparency
      </div>
    </div>
  );
};

export default Affiliation;
