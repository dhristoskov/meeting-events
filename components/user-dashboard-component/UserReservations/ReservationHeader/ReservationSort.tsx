import styles from '@/styles/dashboard.module.scss';

const ReservationSort = () => {

    return (
        <div className={styles.uppernav}>
            <h3>My Reservations</h3>
            <div className={styles.sorting}>
                <p>Types | Reservations</p>
                <p>Sorty by | Date</p>
            </div>
        </div> 
    )
}

export default ReservationSort;