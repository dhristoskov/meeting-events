import { useState, ChangeEvent, FormEvent } from 'react';

import { ValidateInput } from '@/components/utils/formValidator';
import PasswordField from '@/components/auth-component/PasswordField';
import SubmitButton from '@/components/auth-component/SubmitButton';

import styles from '@/styles/auth.module.scss';

interface Props {
    changePasswordHandler: (userData: {password2: string, password: string }) => void;
}

const ChangePassowrd: React.FC<Props> = ({ changePasswordHandler }) => {

    const [ errors, setErrors ] = useState<any>([]);
    const [ userData, setUserData ] = useState<{password2: string, password: string }>({
        password2: '',
        password: ''
     });

    const { password2, password} = userData;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error);
        setUserData({...userData, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        changePasswordHandler(userData);
        setUserData({
            password2: '',
            password: ''
        });
    };

    return (
        <div className={ styles.container }>
            <h3>Change Password</h3>
            <p className={styles.subtext}>enter old and the new password</p>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <div className={styles.field}>
                    <input type="password" name='password2' placeholder='Old password'
                    value={password2} onChange={onHandleChange}/>
                </div>
                <PasswordField onHandleChange={onHandleChange} value={password} errors={errors.password}/>
                <SubmitButton name={'Change Password'} />
            </form>
        </div>
    )
}

export default ChangePassowrd;