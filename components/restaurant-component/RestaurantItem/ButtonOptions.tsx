import { NextPage } from 'next';
import { useContext } from 'react';

import { AuthContext } from 'context/auth-context/AuthContext';

import styles from '@/styles/restaurant.module.scss';

interface Props {
    addToFavorites: () => void;
}

const ButtonOptions: NextPage<Props> = ({ addToFavorites }) => {

    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className={styles.buttons}>
            {
                isLoggedIn && <p className={styles.btn}>Add reviews</p>
            }           
            <p className={styles.btn} onClick={addToFavorites}>Favorites</p>
        </div> 
    )
}

export default ButtonOptions;