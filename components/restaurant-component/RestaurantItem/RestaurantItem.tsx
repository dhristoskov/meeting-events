import { useContext } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import RestaurantInterface from 'interfaces/restaurant';
import ReservationForm from '@/components/reservation-component/ReservationForm';
import { AuthContext } from 'context/auth-context/AuthContext';
import ButtonOptions from './ButtonOptions';

import styles from '@/styles/restaurant.module.scss';
import InfoBar from './AdditionalInfo/InfoBar';
import FoodType from './AdditionalInfo/FoodType';

interface Props {
    restaurant: RestaurantInterface;
    onModalHandler: (reservationData: {startDate: Date, guests: number}) => void;
}

const RestaurantItem: NextPage<Props> = ({ restaurant, onModalHandler }) => {

    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    const addToFavorites = () => {
        if(isLoggedIn){
            router.push('/');
        }else{
            router.push('/auth');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.upper}>
                <div className={styles.info}>
                    <div className={styles.firstline}>
                        <h3 className={styles.uppername}>{ restaurant.name }</h3>
                        <FoodType kitchen_type={restaurant.kitchen_type} />
                    </div>   
                    <InfoBar priceLevel={restaurant.priceLevel} hasGarten={restaurant.hasGarten}/>
                    <p className={styles.description}>{ restaurant.description }</p>
                    <ButtonOptions addToFavorites={addToFavorites}/>     
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
            <div>Our Menu</div>
        </div>
    )
}

export default RestaurantItem;