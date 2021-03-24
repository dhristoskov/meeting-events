import { Fragment, useContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

import ChangePassword from '@/components/auth-component/ChangePassword';
import ChangeEmail from '@/components/auth-component/ChangeEmail';
import UserInterface  from 'interfaces/user';
import { Notification } from 'context/notification-context/Notification';

const UserSettings = () => {

    const router = useRouter();
    const { showNotification } = useContext(Notification);

    const changePasswordHandler = (userData: {password2: string, password: string }) => {
        const token = cookie.get('token');
        axios.put<{msg: string}>('/api/auth/change-password', userData, 
            { headers: 
                { 
                    Authorization: token, 
                    'Content-Type': 'application/json'
                } 
            })
             .then(res => {
                showNotification({message: 'Password changed', type: 'succses'})
                router.push('/user-dashboard');
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    }

    const changeEmailHandler = (emailData: { email: string }) => { 
        const token = cookie.get('token');
        axios.put<UserInterface>('/api/auth/update-user', emailData, 
            { headers: 
                { 
                    Authorization: token, 
                    'Content-Type': 'application/json'
                } 
            })
             .then(res => {
                showNotification({message: 'Email changed', type: 'succses'})
                router.push('/user-dashboard');
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    }

    return (
        <Fragment>
            <ChangePassword changePasswordHandler={changePasswordHandler}/>
            <ChangeEmail changeEmailHandler={changeEmailHandler}/>
        </Fragment>
    )
}

export default UserSettings;