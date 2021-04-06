import { NextPage } from 'next';

import styles from '@/styles/restaurant.module.scss';

interface Props {
    addToFavorites: () => void;
}

const ButtonOptions: NextPage<Props> = ({ addToFavorites }) => {

    return (
        <div className={styles.buttons}>
            <p className={styles.btn}>Reviews</p>
            <p className={styles.btn} onClick={addToFavorites}>Favorites</p>
        </div> 
    )
}

export default ButtonOptions;