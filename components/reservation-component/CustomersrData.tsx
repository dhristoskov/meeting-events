import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { NextPage } from 'next';

import SubmitButton from '@/components/auth-component/SubmitButton';
import { ValidateInput } from '@/components/utils/formValidator';
import TextInputField from '../auth-component/TextInputField';
import ReservationData from 'interfaces/reservationData';
import { AuthContext } from '../../context/auth-context/AuthContext';
import EmailField from '../auth-component/EmailField';

import styles from '@/styles/reservation.module.scss';

interface Props {
    reservationDate: Date;
    onLoginHandler: () => void;
    guests: number;
    onReservationHandler: (reservation: any) => void;
}

const CustomersData: NextPage<Props> = ({ reservationDate, guests, onReservationHandler, onLoginHandler }) => {

    const { isLoggedIn } = useContext(AuthContext);
    const [ errors, setErrors ] = useState<any>([]);
    const [ reservation, setReservation ] = useState<ReservationData>({
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
        <div className={styles.container}>
            <div className={styles.rsrvData}>
                <p>Date: { reservationDate.toLocaleDateString('de-DE',  { weekday: 'long', day:'numeric', month: 'long', year: 'numeric' }) }</p>
                <p>Time: { reservationDate.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'}) }</p>
                <p>Guests: { guests }</p>
            </div>
            {
                isLoggedIn
                ? <h4 className={styles.title}>Continue with your reservation</h4>
                : <h4 className={styles.title}>Continue your reservation as a Guset <span className={styles.login} onClick={onLoginHandler}>or Log-in first</span></h4>
            }      
            <p className={styles.subtext}>Enter reservation details</p>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <TextInputField 
                    name={'first_name'}
                    placeholder={'First Name'}
                    onHandleChange={onHandleChange} 
                    value={first_name} 
                    errors={errors.first_name}
                />
                 <TextInputField 
                    name={'last_name'}
                    placeholder={'Last Name'}
                    onHandleChange={onHandleChange} 
                    value={last_name} 
                    errors={errors.last_name}
                />
                <EmailField onHandleChange={onHandleChange} value={email} errors={errors.email}/>
                <SubmitButton name={'Reservation'}/>
            </form>
        </div> 
    )
}

export default CustomersData;