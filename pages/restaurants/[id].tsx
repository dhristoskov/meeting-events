import { useState, useContext } from "react";
import { GetServerSideProps, NextPage } from "next";
import cookie from 'js-cookie';
import { useRouter } from 'next/router'
import axios from 'axios';

import RestaurantInterface from "interfaces/restaurant";
import RestaurantItem from "@/components/restaurant-component/RestaurantItem/RestaurantItem";
import ReservationModal from "@/components/modal-component/ReservationModal";
import CustomersData from "@/components/reservation-component/CustomersData";
import { Notification } from 'context/notification-context/Notification';
import { AuthContext } from 'context/auth-context/AuthContext';
import ReservationData from "interfaces/reservationData";
import { ReservationContext } from "context/reservation-context/ReservationContext";

interface Props {
    restaurant: RestaurantInterface;
}

const RestaurantInfo: NextPage<Props> = ({ restaurant }) => {

    const router = useRouter();
    const { id } = router.query;

    const { isLoggedIn } = useContext(AuthContext);
    const { setUserReservation } = useContext(ReservationContext);
    const { showNotification } = useContext(Notification);
    const [ isVisible, setIsVisible ] = useState<boolean>(false);

    const onModalHandler = (reservationData: {startDate: Date, guests: number}): void => {
      setUserReservation(reservationData);
      setIsVisible(true);
    };

    const guestReservation = async (reservation: ReservationData) => {
      const Data = {  id, ...reservation }
      await axios.post('/api/reservations/guest', Data, 
        { headers: {'Content-Type': 'application/json'}})
             .then(res => {
                showNotification({message: 'Reservation is successfully add', type: 'success'});
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    }

    const loggedInReservation = async (reservation: ReservationData) => {
      const Data = {  id, ...reservation }
      const token = cookie.get('token');
      await axios.post('/api/reservations/logged-user', Data, 
            { headers: 
              { 
                Authorization: token, 
                'Content-Type': 'application/json'
              } 
            })
             .then(res => {
                showNotification({message: 'Reservation is successfully add', type: 'success'});
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    }

    const onReservationHandler = (reservation: ReservationData) => {
      if(!isLoggedIn){
        guestReservation(reservation);
      }else {
        loggedInReservation(reservation);
      }
      setIsVisible(false);
    }

    const onLoginHandler = () => {
      setIsVisible(false);
      router.push('/auth');
    }

    return (
      <div>    
        <ReservationModal 
            isVisible={isVisible} 
            setIsVisible={setIsVisible}>
              <CustomersData 
                restaurant={restaurant} 
                onLoginHandler={onLoginHandler}
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