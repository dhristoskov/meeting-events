import React, { createContext, ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
};

interface RsrvData {
    startDate: Date;
    guests: number;
};

interface CustomerData {
    reservationDate: Date;
    guests: number;
    first_name: string;
    last_name: string;
    email: string;
};

interface Reservation {
    userReservation: RsrvData;
    customer: CustomerData;
    setUserReservation: (reservation: RsrvData) => void;
    setCustomer: (customer: CustomerData) => void;
}

export const ReservationContext = createContext<Reservation>({} as Reservation);


const ReservationContextProvider: React.FC<Props> = ({ children }) => {

    const [ userReservation, setUserReservation ] = useState<RsrvData>({ startDate: null, guests: null });
    const [ customer, setCustomer ] = useState<CustomerData>({ 
        reservationDate: null, 
        guests: null, 
        first_name: '', 
        last_name: '', 
        email: '' 
    });

    return (
        <ReservationContext.Provider 
            value={{ 
                userReservation,
                customer,
                setUserReservation,
                setCustomer
            }}>
            { children }
        </ReservationContext.Provider>
    )
}

export default ReservationContextProvider;