import { useContext } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import RestaurantInterface from 'interfaces/restaurant';
import ReservationForm from '@/components/reservation-component/ReservationForm';
import { AuthContext } from 'context/auth-context/AuthContext';
import ButtonOptions from './ButtonOptions';

import styles from '@/styles/restaurant.module.scss';

interface Props {
    restaurant: RestaurantInterface;
}

const RestaurantItem: NextPage<Props> = ({ restaurant }) => {

    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    const addToFavorites = () => {
        if(isLoggedIn){
            router.push('/');
        }else{
            router.push('/auth');
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.upper}>
                <div className={styles.info}>
                    <h3 className={styles.uppername}>{ restaurant.name }</h3>
                    <p className={styles.description}>{ restaurant.description }</p>
                    <ButtonOptions addToFavorites={addToFavorites}/>     
                </div>
                <div className={styles.imageContainer}>
                    <img className={ styles.img } src={ restaurant.img } alt={ restaurant.name }/>
                </div>  
            </div>
            <div className={styles.middle}>
                <div className={ styles.reservation }>
                    <ReservationForm />
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