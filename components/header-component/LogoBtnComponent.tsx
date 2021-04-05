import Image from 'next/image';
import { useRouter } from "next/router";
import { useContext } from 'react';

import { ReservationContext } from 'context/reservation-context/ReservationContext';

import styles from '@/styles/header.module.scss';

const LogoBtnComponent = () => {

    const router = useRouter();
    const { setSelectedCity } = useContext(ReservationContext);

    const onToHomeHandler = () => {
        router.push(`/`);
        setSelectedCity('')
    }

    return (
           <Image onClick={onToHomeHandler} src='/icons/logo.svg' alt='logo' width={35} height={35} className={styles.logo}/>           
    )
}

export default LogoBtnComponent