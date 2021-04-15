import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

import RestaurantInterface from "interfaces/restaurant";
import { ValidateInput } from '@/components/helper/formValidator';

import styles from '@/styles/newsletter.module.scss'

interface Props {
    restaurant: RestaurantInterface;
    onNewsLetterHandler: (newsletter: { email: string}) => void;
}

const RestaurantNewsletter: NextPage<Props> = ({ restaurant, onNewsLetterHandler }) => {

    const [ errors, setErrors ] = useState<any>([]);
    const [ newsletter, setNewsletter] = useState<{ email: string}>({
        email: ''
     });

    const { email } = newsletter;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error);
        setNewsletter({...newsletter, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        onNewsLetterHandler(newsletter);
        setNewsletter({
            email: ''         
        });
    };

    return (
        <div className={styles.mine}>
            <h4 className={styles.title}>Subscribe to "{restaurant.name}" news and offers</h4>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <div className={styles.field}>
                    <input type="text" name='email' value={email} placeholder='Subscribe to Newsletter' onChange={onHandleChange}/>
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>
                <input type="submit" value='Subscibe'/>
            </form>
        </div>
    )

}

export default RestaurantNewsletter;