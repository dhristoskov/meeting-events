import RegisterComponent from '@/components/register-component/RegisterComponent';

import styles from '@/styles/auth.module.scss';

const Register = () => {
    return(
        <div className={styles.register}>
            <RegisterComponent />
        </div>
        
    )

}

export default Register;