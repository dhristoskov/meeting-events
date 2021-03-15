import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

import PasswordField from '@/components/auth-component/PasswordField';
import SubmitButton from '@/components/auth-component/SubmitButton';
import { LoginUser } from 'interfaces/loginUser';

import styles from '@/styles/auth.module.scss';

interface Props {
    switchLogin: () => void;
    onLoginHandler: (loginuser: LoginUser) => void;
};

const LoginComponent: React.FC<Props> = ({ switchLogin, onLoginHandler }) => {

    const [ loginUser, setLoginUser ] = useState<LoginUser>({
        nameOrEmail: '',
        password: '',
     });

    const { nameOrEmail, password} = loginUser;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginUser({...loginUser, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        onLoginHandler(loginUser);
        setLoginUser({
            nameOrEmail: '',
            password: '',
        });
    };

    return (
        <div className={ styles.container }>
            <h3>Log-In</h3>
            <p className={styles.subtext}>enter your credentials to log-in</p>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <div className={styles.field}>
                    <input type='text' name='nameOrEmail' placeholder='Enter Email or Username'  
                    value={nameOrEmail} onChange={onHandleChange} />
                </div>
                <PasswordField onHandleChange={onHandleChange} value={password} />
                <SubmitButton name={'Log-in'} />
            </form>
            <p 
            className={styles.redirect} 
            onClick={switchLogin}
            >
                Don't have an account yet
            </p>
        </div>
    )

}

export default LoginComponent;