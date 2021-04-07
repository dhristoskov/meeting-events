import styles from '@/styles/dashboard.module.scss';

const UserReservation = () => {

    return (
        <div className={styles.rsrvdata}>
            <div className={styles.navigation}>
                <div className={styles.uppernav}>
                    <h3>My Reservations</h3>
                    <div className={styles.sorting}>
                        <p>Types | Reservations</p>
                        <p>Sorty by | Date</p>
                    </div>
                </div>  
                <div className={styles.lowernav}>
                    <p>All reservations</p>
                    <p>Up Comming</p>
                    <p>Past</p>
                </div>
                <div className={styles.separator}></div>
            </div>
        </div>
    )

}

export default UserReservation;