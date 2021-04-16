import { NextPage } from "next";
import { IoLocationOutline, IoLinkOutline, IoMailOutline } from 'react-icons/io5';

import RestaurantInterface from "interfaces/restaurant";

import styles from '@/styles/restaurant.module.scss';

interface Props {
    restaurant: RestaurantInterface;
}

const RestaurantBoard: NextPage<Props> = ({ restaurant }) => {

    return (
        <div className={styles.infowrapper}>
            <h3 className={styles.name}>{ restaurant.name }</h3>
            <div className={styles.infos}><IoLocationOutline className={styles.infostats} />
                <span>{restaurant.location}</span>
            </div>
            <div className={styles.infos}><IoLinkOutline className={styles.infostats} />
                <span>{restaurant.urlAddress}</span>
            </div>
            <div className={styles.infos}><IoMailOutline className={styles.infostats} />
                <span>{restaurant.email}</span>
            </div>
        </div>
    )

}

export default RestaurantBoard;