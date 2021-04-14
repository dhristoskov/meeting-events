import { NextPage } from "next";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";

import RestaurantInterface from "interfaces/restaurant";

import 'leaflet/dist/leaflet.css';

// import styles from '@/styles/map.module.scss'

interface Props {
    restaurant: RestaurantInterface;
}

const Map: NextPage<Props> = ({ restaurant }) => {

  const defaultPosition: LatLngTuple = [48.1351, 11.5820 ];
  const zoom: number = 10;

  return (
    <div>
      <MapContainer
        style={{ width:'400px', height: '450px'}}
        scrollWheelZoom={false}
        center={defaultPosition}
        zoom={zoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;