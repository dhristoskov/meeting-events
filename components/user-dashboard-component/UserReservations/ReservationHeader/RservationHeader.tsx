import ReservationSort from './ReservationSort';

import styles from '@/styles/dashboard.module.scss';

const ReservationHeader = () => {

    return (
        <div className={styles.navigation}>
           <ReservationSort /> 
            <div className={styles.lowernav}>
                <p>All reservations</p>
                <p>Up Comming</p>
                <p>Past</p>
            </div>
            <div className={styles.separator}></div>
        </div>
    )
}

export default ReservationHeader;