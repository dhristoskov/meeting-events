import { useContext } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoBulbOutline, IoLogInOutline, IoBulbSharp } from 'react-icons/io5';

import { ThemeContext } from 'context/theme-context/ThemeContext';

import styles from '@/styles/header.module.scss';

const SettingsComponent = () => {
    const { isLight, onThemeChanger } = useContext(ThemeContext);

    return (
        <div className={styles.settings}>
           <Link href='/auth'><a className={styles.login}><IoLogInOutline /></a></Link> 
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