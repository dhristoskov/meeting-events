import { useState, ChangeEvent, FormEvent, useContext } from 'react';

import { ValidateInput } from '@/components/utils/formValidator';
import PasswordField from '@/components/auth-component/PasswordField';
import SubmitButton from '@/components/auth-component/SubmitButton';
import { AuthContext } from 'context/auth-context/AuthContext';

import styles from '@/styles/auth.module.scss';

interface Props {
    changePasswordHandler: (userData: {password2: string, password: string, id: string}) => void;
}

const ChangePassowrd: React.FC<Props> = ({ changePasswordHandler }) => {

    const { userId } = useContext(AuthContext);
    const [ errors, setErrors ] = useState<any>([]);
    const [ userData, setUserData ] = useState<{password2: string, password: string, id: string}>({
        password2: '',
        password: '',
        id: userId
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
            password: '',
            id: userId
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