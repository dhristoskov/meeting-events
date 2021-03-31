import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from 'axios';

import RestaurantInterface from "interfaces/restaurant";
import RestaurantItem from "@/components/restaurant-component/RestaurantItem/RestaurantItem";
import ReservationModal from "@/components/modal-component/ReservationModal";

interface Props {
    restaurant: RestaurantInterface;
  }

const RestaurantInfo: NextPage<Props> = ({ restaurant }) => {

    const [ isVisible, setIsVisible ] = useState<boolean>(false)

    const onModalClose = (): void => {
      setIsVisible(false);
    };

    const onModalOpen = (): void => {
      setIsVisible(true);
    }

    return (
      <div>
        <ReservationModal 
            isVisible={isVisible} 
            onModalClose={onModalClose}>
              <p style={{color: 'black'}}>Modal one</p>
        </ReservationModal>
        <RestaurantItem 
            restaurant={restaurant} 
            onModalOpen={onModalOpen}
        />
      </div>
        
    )

}

export default RestaurantInfo;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query: { id } }) => {

    const data = { params: { id } };
    const url = `http://localhost:3000/api/restaurant/get-restaurant/`;
  
    const response = await axios.get(url, data);
  
    if ( !response  ) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
    }
  
    return {
       props: { restaurant: response.data.restaurant }
    };
  }