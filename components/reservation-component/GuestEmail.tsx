import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { NextPage } from 'next';

import EmailField from "../auth-component/EmailField"
import SubmitButton from '../auth-component/SubmitButton';

interface Props {
    guests: number;
}

const GuestEmail: NextPage<Props> = ({ guests }) => {

    const acctualGuests = guests - 1;
    const [emailtList, setEmailList] = useState<{email: string}[]>([{ email: '' }]);

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
        const { name, value } = e.target;
        const emails = [ ...emailtList ]
        emails[index][name] = value;
        setEmailList(emails)
    };

    const addInputHandler = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault(); 
        const emails = [ ...emailtList ];
        emails.push({ email: '' });
        setEmailList(emails);
    };

    const removeInputHandler = (index: number, e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault(); 
        const emails = [ ...emailtList ];
        emails.splice(index, 1);
        setEmailList(emails);
      };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        console.log(emailtList)
    };

    return(
        <div>
            <h4>You can send e-mail invitation to your { acctualGuests }{ acctualGuests === 1 ? ' guest' : ' guests'}</h4>
            <form onSubmit={onHandleSubmit}>
                {
                    emailtList.map((el: {email: string}, index: number) => {
                        return (
                            index < acctualGuests &&
                            <div key={index}>
                                <EmailField onHandleChange={event => onHandleChange(event, index)} value={el.email}/>
                                <button onClick={addInputHandler}>Add</button>
                                {
                                    index > 0 && <button onClick={e => removeInputHandler(index, e)}>Remove</button>
                                }                        
                            </div>    
                        )           
                    })           
                }   
            <SubmitButton name={'Send'}/>   
            </form>
        </div> 
    )
}

export default GuestEmail