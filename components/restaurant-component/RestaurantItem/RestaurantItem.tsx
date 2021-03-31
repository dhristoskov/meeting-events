import { useContext } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import RestaurantInterface from 'interfaces/restaurant';
import ReservationForm from '@/components/reservation-component/ReservationForm';
import { AuthContext } from 'context/auth-context/AuthContext';
import CostumerStats from './CostumerStats';
import ButtonOptions from './ButtonOptions';

import styles from '@/styles/restaurant.module.scss';

interface Props {
    restaurant: RestaurantInterface;
    onModalOpen: () => void;
}

const RestaurantItem: NextPage<Props> = ({ restaurant, onModalOpen }) => {

    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    const addToFavorites = () => {
        if(isLoggedIn){
            router.push('/');
        }else{
            router.push('/auth');
        }
    }

    const onReservationHandler = () => {
        if(isLoggedIn){
            router.push('/');
        }else{
            onModalOpen();
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.upper}>
                <div className={styles.info}>
                    <h3 className={styles.uppername}>{ restaurant.name }</h3>
                    <CostumerStats />
                    <p className={styles.description}>{ restaurant.description }</p>
                    <ButtonOptions addToFavorites={addToFavorites}/>     
                </div>
                <div className={styles.imageContainer}>
                    <img className={ styles.img } src={ restaurant.img } alt={ restaurant.name }/>
                </div>  
            </div>
            <div className={styles.middle}>
                <div className={ styles.reservation }>
                    <ReservationForm onReservationHandler={onReservationHandler}/>
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