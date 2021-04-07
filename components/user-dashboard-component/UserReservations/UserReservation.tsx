import { NextPage } from 'next';
import { motion } from 'framer-motion';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';

import ReservationHeader from './ReservationHeader/RservationHeader';
import ReservationInterface from 'interfaces/reservation';

import styles from '@/styles/dashboard.module.scss';

interface Props {
    reservations: ReservationInterface[]
}

const UserReservation: NextPage<Props> = ({ reservations }) => {

    return (
        <div className={styles.rsrvdata}>
           <ReservationHeader />
           {
              reservations.length > 0 ? reservations.map( item => {
                return (
                    <motion.div 
                    key={item._id} 
                    className={styles.rsrvitem}
                    whileHover={{ scale: 1.02, originY: 0, transition: { duration: .3 } }}
                    >
                        <p className={styles.name}>{ item.restaurantName }</p>
                        <p className={styles.address}>{ item.restaurantAddress }</p>
                        <div className={styles.options}>
                            <div className={styles.time}>
                                <p>{ new Date(item.reservationDate).toLocaleDateString('de-DE',  { day:'numeric', month: 'long', year: 'numeric' })}</p>
                                <p> | { new Date(item.reservationDate).toLocaleTimeString('de-DE', { hour: '2-digit', minute:'2-digit'}) } h.</p>
                            </div>
                            <p>{ item.restaurantCity }</p>
                        </div>        
                        <p className={styles.guests}>Guests: { item.guests }</p>    
                        <IoEllipsisHorizontalOutline className={styles.icon} />
                    </motion.div>
                  )
              }) : <p className={styles.empty}>Your reservation list is empty</p>
           }
        </div>
    )

}

export default UserReservation;