import { MapContainer } from "react-leaflet";
import NewMap from "./NewMap";
import 'leaflet/dist/leaflet.css';
// function MyComponent() {
//     const map = useMapEvent('click', () => {
//       map.setCenter([50.5, 30.5])
//     })
//     return null
//   }
const Map = ({ location, setLocation, user }) => (
  <div className="h-[400px] w-[400px] overflow-hidden">
    <MapContainer center={location} zoom={11} scrollWheelZoom={true}
    style={{ height: '100vh', width: '100wh' }} >
      <NewMap location={location} user={user} setLocation={setLocation} />
    </MapContainer>
  </div>
);
export default Map;
