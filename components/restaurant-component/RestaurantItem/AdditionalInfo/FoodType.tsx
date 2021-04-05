import { NextPage } from "next"

import styles from '@/styles/restaurant.module.scss';

interface Props {
    kitchen_type: string[];
}

const FoodType: NextPage<Props> = ({ kitchen_type }) => {

    const capitalizeFirstLetter = (type: string): string => {
        return type[0].toUpperCase() + type.slice(1);
    }

    return (
        <div className={styles.kitchen}>
           {
               kitchen_type.map((type: string, index: number) => {
                   return (
                       <p key={index} className={styles.type}>{ capitalizeFirstLetter(type) }</p>
                   )
               })
           }
        </div>
    )
}

export default FoodType