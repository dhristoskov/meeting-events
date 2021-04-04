import { useContext, useState } from 'react';
import { useRouter } from "next/router";
import { ReservationContext } from 'context/reservation-context/ReservationContext';

import styles from '@/styles/header.module.scss';

const CityPicker= () => {

    const { cities } = useContext(ReservationContext);
    const [ isListOpen, setListState ] = useState<boolean>(false);
    const [ selected, setSelected ] = useState<string>('')
    const router = useRouter();

    const toggleSelect = (): void => {
        setListState(prevState => !prevState);
    };

    const selectedItem = (name: string): void => {
        router.push(`/restaurants/by-cityname/${name}`)
        setSelected(name);
        setListState(false);
    };

    return(
        <div className={styles.dropdown}>
            <div onClick={toggleSelect}>{ selected ? selected : 'Select location'}</div>
            <div className={styles.selectors}>
                {
                   isListOpen && cities.map(item => {
                       if(item.city !== selected){
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
        </div>
    )
}

export default CityPicker;


  