import { NextPage } from "next";

import RestaurantInterface from "interfaces/restaurant";

import styles from '@/styles/restaurant.module.scss';

interface Props {
    restaurant: RestaurantInterface;
    onCardOpen: (id: string) => void;
}

const RestaurantCard: NextPage<Props> = ({ restaurant, onCardOpen }) => {

    return (
        <div className={styles.card} onClick={() => onCardOpen(restaurant._id)}>  
            <div className={styles.container}>
                <img className={styles.image} src={restaurant.img} alt={restaurant.name}/>
            </div>      
            <h3 className={styles.name}>{restaurant.name}</h3>
            <p className={styles.location}>{restaurant.location}</p>
        </div>
    )

}

export default RestaurantCard;