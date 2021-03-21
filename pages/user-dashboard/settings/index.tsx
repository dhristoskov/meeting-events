import { Fragment, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import ChangePassword from '@/components/auth-component/ChangePassword';
import ChangeEmail from '@/components/auth-component/ChangeEmail';
import { AuthContext } from 'context/auth-context/AuthContext';
import { UserInterface } from 'interfaces/user';

const UserSettings = () => {

    const router = useRouter();
    const { userId } = useContext(AuthContext);


    const changePasswordHandler = (userData: {password2: string, password: string }) => {
        const newData = {...userData,  id : userId }
        axios.put<{msg: string}>('/api/auth/change-password', newData, 
        { headers: {'Content-Type': 'application/json'}})
             .then(res => {
                router.push({
                    pathname: '/user-dashboard/[id]', 
                    query: { id: userId }
                });
             }).catch(err => {
                console.log(err.response.data.msg);
             });
    }

    const changeEmailHandler = (emailData: { email: string }) => {
        const newData = {...emailData,  id : userId }
        axios.put<UserInterface>('/api/auth/update-user', newData, 
        { headers: {'Content-Type': 'application/json'}})
             .then(res => {
                router.push({
                    pathname: '/user-dashboard/[id]', 
                    query: { id: userId }
                });
             }).catch(err => {
                console.log(err.response.data.msg);
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