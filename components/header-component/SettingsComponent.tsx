import { useContext } from 'react';
import { motion } from 'framer-motion';
import { IoBulbOutline, IoLogInOutline, IoBulbSharp } from 'react-icons/io5';

import { ThemeContext } from 'context/theme-context/ThemeContext';

import styles from '@/styles/header.module.scss';

const SettingsComponent = () => {
    const { isLight, onThemeChanger } = useContext(ThemeContext);

    return (
        <div className={styles.settings}>
           <p className={styles.login}><IoLogInOutline /></p> 
            <motion.p 
            className={styles.icon} 
            onClick={onThemeChanger}
            whileHover={{ scale: 1.1, originY: 0, transition: { duration: .3 } }}
            whileTap={{ scale: 0.9 }}
            >
            { !isLight 
             ? <IoBulbOutline className={styles.light}/>
             : <IoBulbSharp className={styles.dark}/> }
            </motion.p>
        </div>   
    )
}

export default SettingsComponent;