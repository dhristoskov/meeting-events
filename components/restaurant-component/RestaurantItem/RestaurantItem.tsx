import { useContext } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { IoHeartOutline } from 'react-icons/io5';

import RestaurantInterface from 'interfaces/restaurant';
import ReservationForm from '@/components/reservation-component/ReservationForm';
import { AuthContext } from 'context/auth-context/AuthContext';
import InfoBar from './AdditionalInfo/InfoBar';
import FoodType from './AdditionalInfo/FoodType';
import ReviewSection from '../../review-component/ReviewSection';

import styles from '@/styles/restaurant.module.scss';
import ReviewInterface from 'interfaces/review';

interface Props {
    restaurant: RestaurantInterface;
    reviews: ReviewInterface[];
    onAddReviewHandler: (review: { stars: number, context: string}) => void;
    onModalHandler: (reservationData: {startDate: Date, guests: number}) => void;
    onFavoritesHandler: () => void;
}

const RestaurantItem: NextPage<Props> = ({ 
    restaurant, 
    reviews, 
    onModalHandler, 
    onFavoritesHandler, 
    onAddReviewHandler
}) => {

    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    const addToFavorites = (): void => {
        if(isLoggedIn){
            onFavoritesHandler();
        }else{
            router.push('/auth');
        }
    };

    return (
        <div className={styles.main}>
            <p className={styles.back} onClick={() => router.back()}>Go back</p>
            <div className={styles.upper}>
                <div className={styles.info}>
                    <div className={styles.firstline}>
                        <h3 className={styles.uppername}>{ restaurant.name }</h3>
                        <div className={styles.secondline}>
                            <FoodType kitchen_type={restaurant.kitchen_type} />
                            <IoHeartOutline className={styles.icon} onClick={addToFavorites}/>
                        </div>                    
                    </div>   
                    <InfoBar priceLevel={restaurant.priceLevel} hasGarten={restaurant.hasGarten}/>
                    <p className={styles.description}>{ restaurant.description }</p>  
                </div>
                <div className={styles.imageContainer}>
                    <img className={ styles.img } src={ restaurant.img } alt={ restaurant.name }/>
                </div>  
            </div>
            <div className={styles.middle}>
                <div className={ styles.reservation }>
                    <ReservationForm onModalHandler={onModalHandler}/>
                </div>
                <div className={styles.moreinfo}>
                    <p>Google Maps</p>
                    <h3 className={styles.name}>{ restaurant.name }</h3>
                    <p className={styles.location}>{restaurant.location}</p>
                    <p className={styles.url}>{restaurant.urlAddress}</p>
                    <p className={styles.email}>{restaurant.email}</p>
                </div>
            </div>   
            <ReviewSection reviews={reviews} onAddReviewHandler={onAddReviewHandler}/>   
        </div>
    )
}

export default RestaurantItem;