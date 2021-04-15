import { Fragment, useEffect, useState } from 'react';
import { NextPage } from "next";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {Icon} from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

import RestaurantInterface from "interfaces/restaurant";

import 'leaflet/dist/leaflet.css';
// import styles from '@/styles/map.module.scss'

interface Props {
    restaurant: RestaurantInterface;
}

const Map: NextPage<Props> = ({ restaurant }) => {

  const provider = new OpenStreetMapProvider();
  const [ position, setPosition ] = useState<[number, number]>();
  const zoom: number = 17;

  const ICON = new Icon({
    iconUrl: "/icons/location.png",
    iconSize: [32, 32],
  })

  useEffect(() => {
    const fetchLocation = async () => {
      await provider.search({ query: restaurant.location })
      .then((results: any) => {
        const position: [number, number] = [ 
          results[0].y,
          results[0].x
        ]
        setPosition(position);
      });
    }
  
    fetchLocation();
  }, [])

  return (
    <Fragment>
    {
      position 
      ? 
      ( <div>
          <MapContainer
            style={{ width:'400px', height: '250px'}}
            scrollWheelZoom={false}
            center={position}
            zoom={zoom}
          >
            <Marker 
              position={position} 
              icon={ICON}
            >
              <Popup>
                <div style={{ display: 'flex'}}>
                  <img src={restaurant.img} alt="restaurant" style={{ width: '50px', height: '50px'}}/>
                  <div>
                    <p>{restaurant.name}</p>
                    <p>{restaurant.location}</p>
                  </div>
                </div>        
              </Popup>
            </Marker>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
        ) : <p>Loading..</p>
    }
    </Fragment>
  );
};

export default Map;