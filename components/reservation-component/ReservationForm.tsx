import { ChangeEvent, FormEvent, useState } from 'react';

import DateForm from './DataForm';

import styles from '@/styles/restaurant.module.scss';

const Reservation = () => {

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [ guests, setGuests ] = useState<number>(2);

    const reservation = {
        startDate,
        guests
    }

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(reservation)
    }


    return(
        <form onSubmit={onHandleSubmit} className={styles.form}>
            <DateForm startDate={startDate} setStartDate={setStartDate}/>
            <input type='number' min="2" max="25" name='guests' value={guests}
             placeholder='2' onChange={(e: ChangeEvent<HTMLInputElement>) => setGuests(parseInt(e.target.value))}/>
            <input type='submit' value='RSRV' />
        </form>
    )
}

export default Reservation;