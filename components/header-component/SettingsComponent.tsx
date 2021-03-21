import { useContext } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
    IoBulbOutline, 
    IoLogInOutline, 
    IoBulbSharp, 
    IoLogOutOutline, 
    IoPersonOutline 
} from 'react-icons/io5';

import { ThemeContext } from 'context/theme-context/ThemeContext';
import { AuthContext } from 'context/auth-context/AuthContext';

import styles from '@/styles/header.module.scss';

const SettingsComponent = () => {

    const router = useRouter();
    const { isLoggedIn, logout, userId } = useContext(AuthContext);
    const { isLight, onThemeChanger } = useContext(ThemeContext);

    const onLogOutHandler = () => {
        logout();
        router.replace('/');
    }

    return (
        <div className={styles.settings}>
            {
                isLoggedIn 
                ? 
                <div className={styles.loggedIn}>
                    <p className={styles.auth} onClick={onLogOutHandler}><IoLogOutOutline /></p>
                    <Link href={`/user-dashboard/${ userId }`}><a className={styles.profile}><IoPersonOutline /></a></Link> 
                </div> 
                : <Link href='/auth'><a className={styles.auth}><IoLogInOutline /></a></Link> 
            }       
            <motion.p 
            className={styles.icon} 
            onClick={onThemeChanger}
            whileHover={{ scale: 1.1, originY: 0, transition: { duration: .3 } }}
            whileTap={{ scale: 0.9 }}
            >
            { !isLight 
             ? <IoBulbSharp className={styles.light}/>
             : <IoBulbOutline className={styles.dark}/>}
            </motion.p>
        </div>   
    )
}

export default SettingsComponent;