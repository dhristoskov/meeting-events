import axios from 'axios';
import { useRouter } from 'next/router';

import ChangePassword from '@/components/auth-component/ChangePassword';

const UserSettings = () => {

    const router = useRouter();


    const changePasswordHandler = (userData: {password2: string, password: string, id: string}) => {
        axios.put('/api/auth/change-password', userData, 
        { headers: {'Content-Type': 'application/json'}})
             .then(res => {
                router.push('/');
                console.log(res);
             }).catch(err => {
                console.log(err.response.data.msg);
             });
    }

    return (
        <ChangePassword changePasswordHandler={changePasswordHandler}/>
    )
}

export default UserSettings;