import React, { useState, ChangeEvent, FormEvent } from 'react';

import { ValidateInput } from '@/components/utils/formValidator';
import PasswordField from '@/components/auth-component/PasswordField';
import SubmitButton from '@/components/auth-component/SubmitButton';
import EmailField from '@/components/auth-component/EmailField';
import { RegistrationUser } from 'interfaces/registrationUser';

import styles from '@/styles/auth.module.scss';

interface Props {
    onRegisterHandler: (user: RegistrationUser) => void;
}

const RegisterComponent: React.FC<Props> = ({ onRegisterHandler }) => {

    const [ errors, setErrors ] = useState<any>([]);
    const [ registerUser, setRegisterUser ] = useState<RegistrationUser>({
        username: '',
        email: '',
        password: '',
        password2: ''
     });

    const { username, email, password, password2 } = registerUser;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error)
        setRegisterUser({...registerUser, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        if(password !== password2){
            setErrors({ confirm:'Password and confirm password does not match' })
        }else {
            onRegisterHandler(registerUser);
            setRegisterUser({
                username: '',
                email: '',
                password: '',
                password2: ''
            });
        }
    };

    return (
        <div className={ styles.container }>
            <h3>Registration</h3>
            <p className={styles.subtext}>Before using our app, you need to create an account</p>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <div className={styles.field}>
                    <input type='text' name='username' placeholder='Username'  
                    value={username} onChange={onHandleChange} />
                    {errors.username && <p className={styles.errors}>{errors.username}</p>}
                </div>
                <PasswordField onHandleChange={onHandleChange} value={password} errors={errors.password}/>
                <div className={styles.field}>
                    <input type="password" name='password2' placeholder='Confirm password'
                    value={password2} onChange={onHandleChange}/>
                    {errors.password2 && <p className={styles.errors}>{errors.password2}</p>}
                </div>
                <EmailField onHandleChange={onHandleChange} value={email} errors={errors.email}/>
                <SubmitButton name={'Registration'} errors={errors}/>
            </form>
        </div>
    )

}

export default RegisterComponent;