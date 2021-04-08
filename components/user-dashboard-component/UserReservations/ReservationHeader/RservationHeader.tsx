import { NextPage } from 'next';
import { useState } from 'react';

import ReservationSort from './ReservationSort';
import ReservationInterface from 'interfaces/reservation';

import styles from '@/styles/dashboard.module.scss';

interface Props {
    reservations: ReservationInterface[];
    steCurrentReservations: (reservations: ReservationInterface[]) => void;
}

const ReservationHeader: NextPage<Props> = ({ reservations, steCurrentReservations }) => {

    const upCommingHandler = (): void => {
        const reservCopy = [ ...reservations ];
        const upComming = reservCopy.filter(rsrv => new Date(rsrv.reservationDate).getTime() > Date.now());
        steCurrentReservations(upComming);
    }

    const pastRsrvHandler = (): void  => {
        const reservCopy = [ ...reservations ];
        const pastRsrv = reservCopy.filter(rsrv => new Date(rsrv.reservationDate).getTime() <= Date.now());
        steCurrentReservations(pastRsrv);
    }

    return (
        <div className={styles.navigation}>
           <ReservationSort /> 
            <div className={styles.lowernav}>
                <p className={styles.btn} onClick={() => steCurrentReservations(reservations)}>All reservations</p>
                <p className={styles.btn} onClick={upCommingHandler}>Up Comming</p>
                <p className={styles.btn} onClick={pastRsrvHandler}>Past</p>
            </div>
            <div className={styles.separator}></div>
        </div>
    )
}

export default ReservationHeader;