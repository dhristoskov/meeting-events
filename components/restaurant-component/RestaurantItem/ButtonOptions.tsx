import { NextPage } from 'next';

import styles from '@/styles/restaurant.module.scss';

interface Props {
    addToFavorites: () => void;
}

const ButtonOptions: NextPage<Props> = ({ addToFavorites }) => {

    return (
        <div className={styles.buttons}>
            <p className={styles.btn}>Reviews</p>
            <button className={styles.btn} onClick={addToFavorites}>Favorites</button>
        </div> 
    )
}

export default ButtonOptions;