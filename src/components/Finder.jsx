import React, { useState, useEffect } from "react";

const Finder = () => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const handleChange = (event) => {
    setLocation(event.target.value);
  };
  const fetchData = async () => {
    if (!location) return;
    try {
      const params = {
        q: location,
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
      setCoordinates({
        latitude: firstResult.lat,
        longitude: firstResult.lon,
      });
      console.log("First Res: ",firstResult);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <div className="text-black">
      <input type="text" value={location} onChange={handleChange} />
      <button onClick={fetchData} className="p-2 bg-gray-500 rounded ml-3">Submit</button>
      <p> 
        Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
      </p>
    </div>
  );
};

export default Finder;
