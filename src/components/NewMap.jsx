import {
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
const NewMap = ({ location, user, setLocation }) => {
  useMapEvent("click", (e) => {
    const coordinates = [e.latlng.lat, e.latlng.lng];
    setLocation(coordinates);
  });
  return (
    <div>
      <TileLayer
        onClick={(e) => console.log("Latlng: ", e.latlng)}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>{user}</Popup>
      </Marker>
    </div>
  );
};

export default NewMap;
