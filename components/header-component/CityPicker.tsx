import { useContext, useState } from 'react';
import { useRouter } from "next/router";
import { ReservationContext } from 'context/reservation-context/ReservationContext';

import styles from '@/styles/header.module.scss';

const CityPicker= () => {

    const { cities, setSelectedCity, selectedCity } = useContext(ReservationContext);
    const [ isListOpen, setListState ] = useState<boolean>(false);
    const router = useRouter();

    const toggleSelect = (): void => {
        setListState(prevState => !prevState);
    };

    const selectedItem = (name: string): void => {
        router.push(`/restaurants/by-cityname/${name}`);
        setSelectedCity(name);
        setListState(false);
    };

    return(
        <div className={styles.dropdown} tabIndex={0} onBlur={() => setListState(false)}>
            <div onClick={toggleSelect} className={styles.default}>
                <span>{ selectedCity ? selectedCity : 'Location'}</span>
            </div>
            {
                isListOpen && 
                <div className={styles.selectors}>
                    {
                        cities.map(item => {
                        if(item.city !== selectedCity){
                            return (
                                <p className={styles.select} 
                                key={item.city}
                                onClick={() => selectedItem(item.city)}
                                >
                                    { item.city }
                                </p>
                            )
                        }            
                        })
                    }
                </div>
            }
        </div>
    )
}

export default CityPicker;


  