import { IoRibbonOutline } from 'react-icons/io5'; 

import styles from '@/styles/restaurant.module.scss';

const CostumerStats = () => {

    return (
        <p className={styles.states}><IoRibbonOutline className={styles.stars}/> 8.3/ 10</p>
    )

}

export default CostumerStats;