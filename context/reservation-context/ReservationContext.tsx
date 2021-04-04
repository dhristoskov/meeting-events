import React, { createContext, ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
};

interface RsrvData {
    startDate: Date;
    guests: number;
};

interface Cities {
    city: string
}


interface Reservation {
    cities: Cities[]
    userReservation: RsrvData;
    setUserReservation: (reservation: RsrvData) => void;
    setCities: (cities: Cities[]) => void;
}

export const ReservationContext = createContext<Reservation>({} as Reservation);


const ReservationContextProvider: React.FC<Props> = ({ children }) => {

    const [ userReservation, setUserReservation ] = useState<RsrvData>({ startDate: null, guests: null });
    const [ cities, setCities ] = useState<Cities[]>([]);
    // const [ selectedCity, setSelectedCity ] = useState<string>()

    return (
        <ReservationContext.Provider 
            value={{ 
                cities,
                userReservation,
                setUserReservation,
                setCities
            }}>
            { children }
        </ReservationContext.Provider>
    )
}

export default ReservationContextProvider;