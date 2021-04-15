import { useState, useContext, useCallback } from "react";
import { GetServerSideProps, NextPage } from "next";
import cookie from 'js-cookie';
import { useRouter } from 'next/router'
import axios from 'axios';

import RestaurantInterface from "interfaces/restaurant";
import RestaurantItem from "@/components/restaurant-component/RestaurantItem/RestaurantItem";
import Modal from "@/components/modal-component/Modal";
import CustomersData from "@/components/reservation-component/CustomersData";
import { Notification } from 'context/notification-context/Notification';
import { AuthContext } from 'context/auth-context/AuthContext';
import ReservationData from "interfaces/reservationData";
import { ReservationContext } from "context/reservation-context/ReservationContext";
import ReviewInterface from "interfaces/review";

interface Props {
    restaurant: RestaurantInterface;
    reviews: ReviewInterface[];
}

const RestaurantInfo: NextPage<Props> = ({ restaurant, reviews }) => {

    const router = useRouter();
    const { id } = router.query;

    const { isLoggedIn } = useContext(AuthContext);
    const { setUserReservation } = useContext(ReservationContext);
    const { showNotification } = useContext(Notification);
    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    
    const refreshData = useCallback(() => {
      router.replace(router.asPath)
    }, []);

    const onModalHandler = (reservationData: {startDate: Date, guests: number}): void => {
      setUserReservation(reservationData);
      setIsVisible(true);
    };

    const onAddReviewHandler = async (review: { stars: number, context: string}) => {
      const token = cookie.get('token');
      const Data = {  id, ...review }
      await axios.post('/api/review', Data, 
            { headers: 
              { 
                Authorization: token, 
                'Content-Type': 'application/json'
              } 
            })
             .then(res => {
                showNotification({message: 'Review published', type: 'success'});
                refreshData();
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    }

    const onFavoritesHandler = async () => {
      const token = cookie.get('token');
      await axios.put('/api/user-profile/profile', { id }, 
            { headers: 
              { 
                Authorization: token, 
                'Content-Type': 'application/json'
              } 
            })
             .then(res => {
                showNotification({message: 'Favorites updated', type: 'success'});
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    }

    const onNewsLetterHandler = async ( newsletter: { email: string }) => {
      const Data = {  id, ...newsletter }
      await axios.put('/api/newsletter', Data, 
        { headers: {'Content-Type': 'application/json'}})
             .then(res => {
                showNotification({message: 'Subscribed successfully', type: 'success'});
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    }

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
      await axios.post('/api/reservations/user', Data, 
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
        <Modal 
            isVisible={isVisible} 
            setIsVisible={setIsVisible}>
              <CustomersData 
                restaurant={restaurant} 
                onLoginHandler={onLoginHandler}
                onReservationHandler={onReservationHandler}
              />
        </Modal>
        <RestaurantItem 
            restaurant={restaurant} 
            reviews={reviews}
            onModalHandler={onModalHandler}
            onFavoritesHandler={onFavoritesHandler}   
            onAddReviewHandler={onAddReviewHandler}    
            onNewsLetterHandler={onNewsLetterHandler}    
        />
      </div>
        
    )

}

export default RestaurantInfo;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query: { id } }) => {

    const data = { params: { id } };

    const urlRestaurant = `http://localhost:3000/api/restaurant/get-restaurant/`;
    const urlReviews = `http://localhost:3000/api/review`;

    let restaurant: RestaurantInterface = null;
    let reviews: ReviewInterface[] = [];

    const responseRestaurant = axios.get(urlRestaurant, data);
    const responseReviews = axios.get(urlReviews, data);

    await axios.all([
      responseRestaurant,
      responseReviews
    ])
    .then(axios.spread((...responses) => {
      restaurant = responses[0].data.restaurant;
      reviews = responses[1].data.reviews;
    }));

    if ( !restaurant  ) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
    }
  
    return {
       props: { restaurant, reviews }
    };
  }