import { ChangeEvent, FormEvent, Fragment, useContext, useState } from 'react';

import { ReservationContext } from 'context/reservation-context/ReservationContext';

import styles from '@/styles/header.module.scss';

const Search = () => {

    const { selectedCity } = useContext(ReservationContext);
    const [ filtered, setFiltered ] = useState<string>('');

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setFiltered(e.target.value);
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        setFiltered('')
        console.log(filtered)
    };

    return (
        <Fragment>
            {
                selectedCity &&
                <div className={styles.search}>
                    <form className={styles.searchform} onSubmit={onHandleSubmit}>
                        <input type="text" placeholder='Search restaurants' name='filtered'
                            value={filtered} onChange={onHandleChange}/>
                    </form>
                </div>
            }
        </Fragment>
       
    )
}

export default Search;