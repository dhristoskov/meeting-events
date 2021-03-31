import { ChangeEvent, FormEvent, useState } from 'react';
import { NextPage } from 'next';

import SubmitButton from '@/components/auth-component/SubmitButton';
import { ValidateInput } from '@/components/utils/formValidator';
import EmailField from '../auth-component/EmailField';

import styles from '@/styles/reservation.module.scss';

interface Props {
    reservationDate: Date;
    guests: number;
    onReservationHandler: (reservation: any) => void;
}

const CustomersData: NextPage<Props> = ({ reservationDate, guests, onReservationHandler }) => {

    const [ errors, setErrors ] = useState<any>([]);
    const [ reservation, setReservation ] = useState({
        reservationDate: reservationDate,
        guests: guests,
        first_name: '',
        last_name: '',
        email: ''
     });

    const { first_name, last_name, email } = reservation;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error);
        setReservation({...reservation, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        onReservationHandler(reservation);
        setReservation({
            reservationDate: null,
            guests: null,
            first_name: '',
            last_name: '',
            email: ''
        });
    };

    return (
        <div className={styles.container} style={{ color: 'black'}}>
            <div>
                <p>Date: { reservationDate.toLocaleDateString('de-DE',  { weekday: 'long', day:'numeric', month: 'long', year: 'numeric' }) }</p>
                <p>Time: { reservationDate.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'}) }</p>
                <p>Guests: { guests }</p>
            </div>
            <h4 className={styles.title}>Continue reservation as a Guset</h4>
            <p className={styles.subtext}>or Login first</p>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <div className={styles.field}>
                    <input type='text' name='first_name' placeholder='First Name'  
                    value={first_name} onChange={onHandleChange} />
                    {errors.first_name && <p className={styles.errors}>{errors.first_name}</p>}
                </div>
                <div className={styles.field}>
                    <input type='text' name='last_name' placeholder='Last Name'  
                    value={last_name} onChange={onHandleChange} />
                    {errors.last_name && <p className={styles.errors}>{errors.last_name}</p>}
                </div>
                <EmailField onHandleChange={onHandleChange} value={email} errors={errors.email}/>
                <SubmitButton name={'Reservation'} errors={errors}/>
            </form>
        </div> 
    )
}

export default CustomersData;