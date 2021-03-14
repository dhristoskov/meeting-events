import Image from 'next/image';
import axios from 'axios';

// import RegisterComponent from '@/components/auth-component/RegisterComponent';
import LoginComponent from '@/components/auth-component/LoginComponent';
import { RegistrationUser } from 'interfaces/registrationUser';

import styles from '@/styles/auth.module.scss';

const Register = () => {

    const onRegisterHandler = (user: RegistrationUser) => {
        axios.post<RegistrationUser>('/api/auth/user-register', user, 
        { headers: {'Content-Type': 'application/json'}})
             .then(res => {
                console.log(res)
             }).catch(err => {
                console.log(err);
             });
    };

    return(
        <div className={styles.register}>
            <Image src='/icons/register.svg' alt={'register'} width={320} height={320}/>
            {/* <RegisterComponent onRegisterHandler={onRegisterHandler}/> */}
            <LoginComponent />
        </div>
        
    )

}

export default Register;