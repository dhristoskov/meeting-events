import { useState, ChangeEvent, FormEvent } from 'react';

import EmailField from '@/components/auth-component/EmailField';
import SubmitButton from '@/components/auth-component/SubmitButton';
import { ValidateInput } from '@/components/utils/formValidator';

import styles from '@/styles/auth.module.scss';

interface Props {
    changeEmailHandler: (emailData: {email: string}) => void;
}

const ChangeEmail:React.FC<Props> = ({ changeEmailHandler }) => {

    const [ errors, setErrors ] = useState<any>([]);
    const [ changeEmail, setChangeEmail ] = useState<{email: string}>({ email: '' });

    const { email } = changeEmail;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error);
        setChangeEmail({...changeEmail, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        changeEmailHandler(changeEmail);
        setChangeEmail({ email: ''});
    };

    return (
        <div className={ styles.container }>
            <h3>Add/Change Email</h3>
            <p className={styles.subtext}>Enter your e-mail address</p>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <EmailField onHandleChange={onHandleChange} value={email} errors={errors.email}/>
                <SubmitButton name={'Change Email'} errors={errors}/>
            </form>
        </div>
    )
}

export default ChangeEmail