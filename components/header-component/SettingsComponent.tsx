import { useContext } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
    IoBulbOutline, 
    IoBulbSharp, 
    IoPersonOutline,
} from 'react-icons/io5';

import { ThemeContext } from 'context/theme-context/ThemeContext';
import { AuthContext } from 'context/auth-context/AuthContext';
import IconCompnent from './IconComponent';

import styles from '@/styles/header.module.scss';

const SettingsComponent = () => {
    
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { isLight, onThemeChanger } = useContext(ThemeContext);

    return (
        <div className={styles.settings}>
            {
                isLoggedIn 
                ? 
                <div className={styles.loggedIn}>
                    <p className={styles.auth} onClick={logout}>Logout</p>
                    <IconCompnent>
                        <Link href={`/user-dashboard`}>
                            <a className={styles.profile}><IoPersonOutline /></a>
                        </Link>
                    </IconCompnent>           
                </div> 
                : <Link href='/auth'><a className={styles.auth}>Log-In</a></Link> 
            }       
            <motion.p 
            className={styles.icon} 
            onClick={onThemeChanger}
            whileHover={{ scale: 1.05, originY: 0, transition: { duration: .3 } }}
            whileTap={{ scale: 0.95 }}
            >
            { !isLight 
             ? <IoBulbSharp className={styles.light}/>
             : <IoBulbOutline className={styles.dark}/>}
            </motion.p>
        </div>   
    )
}

export default SettingsComponent;