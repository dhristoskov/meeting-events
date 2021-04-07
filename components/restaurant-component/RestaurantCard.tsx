import { NextPage } from "next";

import RestaurantInterface from "interfaces/restaurant";
import CostumerStats from "./RestaurantItem/AdditionalInfo/CostumerStats";

import styles from '@/styles/restaurant.module.scss';
import FoodType from "./RestaurantItem/AdditionalInfo/FoodType";

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
            <CostumerStats />
            <FoodType kitchen_type={restaurant.kitchen_type}/>
            <p className={styles.location}>{restaurant.location}</p>
        </div>
    )

}

export default RestaurantCard;