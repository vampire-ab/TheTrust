import React, { useState } from "react";

const Location = ({ location, setCtr, zoomLevel, name, setLocation }) => {
  console.log(location);
  async function fetchData() {
    if (!location) return;
    try {
      console.log("Fetching...");
      const params = {
        q: address,
        format: "json",
        addressDetails: 1,
        polygon_geojson: 0,
      };
      const query = new URLSearchParams(params).toString();
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${query}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      //   const newData = JSON.parse(data);
      const [firstResult] = data;
      const coordinates = [Number(firstResult.lat), Number(firstResult.lon)];
      setLocation(coordinates);
      console.log("First Res: ", firstResult);
    } catch (e) {
      console.log("Error: ", e);
    }
  }
  const [address, setAddress] = useState("");
  return (
    <div className="border-t-4 border-indigo-600 overflow-hidden rounded shadow-lg">
      <h3 className="text-xl text-center mt-8 mb-8">
        Set your location, {name.split(' ')[0]}
      </h3>
      <div className="px-4 mb-4">
        <input
          id="name"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray rounded w-full p-3 text-center"
          placeholder="Landmark Address"
          autoComplete="off"
          value={address}
        />
      </div>
      <div className="px-4 mb-4">
        <button
          onClick={() => fetchData()}
          className="border border-gray bg-indigo-600 text-white rounded w-full p-3 text-center"
        >
          Set Precisely on Map
        </button>
        <button
          onClick={() => setCtr(4)}
          className="border border-gray bg-indigo-600 text-white rounded w-full p-3 text-center"
        >
          Submit if set
        </button>
      </div>      
    </div>
  );
};
export default Location;
