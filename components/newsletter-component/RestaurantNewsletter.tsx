import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

import RestaurantInterface from "interfaces/restaurant";
import { ValidateInput } from '@/components/helper/formValidator';

interface Props {
    restaurant: RestaurantInterface;
}

const RestaurantNewsletter: NextPage<Props> = ({ restaurant }) => {

    const [ errors, setErrors ] = useState<any>([]);
    const [ newsletter, setNewsletter] = useState<{id: string, email: string}>({
        id: restaurant._id,
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
        console.log(newsletter);
        setNewsletter({
            email: '',
            id: undefined
        });
    };

    return (
        <div>
            <form onSubmit={onHandleSubmit}>
                <div>
                    <input type="text" name='email' value={email} placeholder='Subscribe to Newsletter' onChange={onHandleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <input type="submit" value='Subscibe'/>
            </form>
        </div>
    )

}

export default RestaurantNewsletter;