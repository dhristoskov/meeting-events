import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from 'axios';

import RestaurantInterface from "interfaces/restaurant";
import RestaurantItem from "@/components/restaurant-component/RestaurantItem/RestaurantItem";
import ReservationModal from "@/components/modal-component/ReservationModal";
import CustomersData from "@/components/reservation-component/CustomersrData";

interface Props {
    restaurant: RestaurantInterface;
  }

const RestaurantInfo: NextPage<Props> = ({ restaurant }) => {

    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ guests, setGuests ] = useState<number>(null);
    const [ reservationDate, setReservationDate ] = useState<Date>(null);
    
    const onModalHandler = (reservationData: {startDate: Date, guests: number}): void => {
      setReservationDate(reservationData.startDate);
      setGuests(reservationData.guests);
      setIsVisible(true);
    };

    const onReservationHandler = (reservation: any) => {
      console.log(reservation);
      setIsVisible(false);
    }

    return (
      <div>
        <ReservationModal 
            isVisible={isVisible} 
            setIsVisible={setIsVisible}>
              <CustomersData 
                reservationDate={reservationDate} 
                guests={guests} 
                onReservationHandler={onReservationHandler}
              />
        </ReservationModal>
        <RestaurantItem 
            restaurant={restaurant} 
            onModalHandler={onModalHandler}
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