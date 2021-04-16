import { NextPage } from "next"
import { useRouter } from "next/router";

import styles from '@/styles/restaurant.module.scss';

interface Props {
    kitchen_type: string[];
}

const FoodType: NextPage<Props> = ({ kitchen_type }) => {

    const router = useRouter();

    const capitalizeFirstLetter = (type: string): string => {
        return type[0].toUpperCase() + type.slice(1);
    }

    const onFoodTypeHandler = (type: string) => {
        const newType = type.toLowerCase();
        router.push(`/restaurants/by-kitchen-type/${newType}`);  
    }

    return (
        <div className={styles.kitchen}>
           {
               kitchen_type.map((type: string, index: number) => {
                   return (
                       <p key={index} 
                            className={styles.type}
                            onClick={() => onFoodTypeHandler(type)} 
                        >
                           { capitalizeFirstLetter(type) }
                        </p>
                   )
               })
           }
        </div>
    )
}

export default FoodType