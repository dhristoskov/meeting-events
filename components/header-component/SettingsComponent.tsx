import { useContext } from 'react';
import { IoBulbOutline, IoLogInOutline, IoBulbSharp } from 'react-icons/io5';

import { ThemeContext } from 'context/theme-context/ThemeContext';

import styles from '@/styles/header.module.scss';

const SettingsComponent = () => {
    const { isLight, onThemeChanger } = useContext(ThemeContext);

    return (
        <div className={styles.settings}>
            <IoLogInOutline className={styles.login}/>
            <p className={styles.icon} onClick={onThemeChanger}>
            { !isLight  ? <IoBulbOutline /> : <IoBulbSharp /> }
            </p>
        </div>   
    )
}

export default SettingsComponent;