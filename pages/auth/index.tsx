import { useState, useContext, Fragment } from 'react';
import Image from 'next/image';
import axios from 'axios';

import RegisterComponent from '@/components/auth-component/RegisterComponent';
import LoginComponent from '@/components/auth-component/LoginComponent';
import { AuthContext } from 'context/auth-context/AuthContext';
import { RegistrationUser } from 'interfaces/registrationUser';
import { Notification } from 'context/notification-context/Notification';
import { LoginUser } from 'interfaces/loginUser';

import styles from '@/styles/auth.module.scss';

interface UserResponse {
    token: string;
    expirInTime?: Date;
}

const Register = () => {

    const { showNotification } = useContext(Notification);
    const { login } = useContext(AuthContext);
    const [ isLogin, setIsLogin ] = useState<boolean>(true);

    const onRegisterHandler = (user: RegistrationUser) => {
        axios.post<UserResponse>('/api/auth/user-register', user, 
        { headers: {'Content-Type': 'application/json'}})
             .then(res => {
                showNotification({message: 'Registered successfully', type: 'success'});
                login( res.data.token );
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    };

    const onLoginHandler = (loginUser: LoginUser) => {
        axios.post<UserResponse>('/api/auth/user-login', loginUser, 
        { headers: {'Content-Type': 'application/json'}})
             .then(res => {
                showNotification({message: 'Login successfully', type: 'success'});
                login(res.data.token);
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    };

    const switchLogin = (): void => {
        setIsLogin(prevState => !prevState);
    };

    return(
        <Fragment>
            <div className={styles.register}>
                {
                    isLogin 
                    ? <Image src='/icons/register.svg' alt={'register'} width={320} height={320}/>
                    : <Image src='/icons/login.svg' alt={'login'} width={320} height={320}/>
                }   
                {
                    isLogin 
                    ? <LoginComponent switchLogin={switchLogin} onLoginHandler={onLoginHandler}/>
                    : <RegisterComponent onRegisterHandler={onRegisterHandler} switchLogin={switchLogin}/>
                }
             </div>
        </Fragment>


        
    )

}

export default Register;