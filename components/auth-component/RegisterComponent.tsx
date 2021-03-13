import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

import { ValidateInput } from '@/components/utils/formValidator';
import PasswordField from '@/components/auth-component/PasswordField';
import { RegistrationUser } from 'interfaces/registrationUser';

import styles from '@/styles/auth.module.scss';

interface Props {
    onRegisterHandler: (user: RegistrationUser) => void;
}

const RegisterComponent: React.FC<Props> = ({ onRegisterHandler }) => {

    const [ addEmail, onEmailAdd ] = useState(false);
    const [ errors, setErrors ] = useState<any>([]);
    const [ registerUser, setRegisterUser ] = useState<RegistrationUser>({
        username: '',
        email: '',
        password: '',
        password2: ''
     });

    const { username, email, password, password2 } = registerUser;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const { name, value } = e.target;
        let error = ValidateInput(name, value);
        setErrors(error)
        setRegisterUser({...registerUser, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        onRegisterHandler(registerUser);
        setRegisterUser({
            username: '',
            email: '',
            password: '',
            password2: ''
        });
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
                <div className={styles.field}>
                    {
                        !addEmail && <p onClick={() => onEmailAdd(true)}
                        className={styles.email}>
                            Click to add E-mail for more security
                        </p>
                    }
                    {
                        addEmail && 
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: .7 }}>
                            <input type="text" name='email' placeholder='E-mail'
                            value={email} onChange={onHandleChange} />   
                            {errors.email && <p className={styles.errors}>{errors.email}</p>}  
                        </motion.div>
                    }
                </div>
                <div className={styles.field}>
                    <input type="submit" value='Register'/>   
                </div>
            </form>
        </div>
    )

}

export default RegisterComponent;