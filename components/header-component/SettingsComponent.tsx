import { useState } from 'react';
import { IoBulbOutline, IoLogInOutline, IoBulbSharp } from 'react-icons/io5';

import styles from '@/styles/header.module.scss';

const SettingsComponent = () => {
    const [ isLight, setIsLight ] = useState<boolean>(false);

    const onThemeChanger = () => {
        setIsLight(prevState => !prevState);
    }

    return (
        <div className={styles.settings}>
            <IoLogInOutline className={styles.login}/>
            {
                isLight 
                ? <IoBulbOutline onClick={onThemeChanger} className={styles.icon}/> 
                : <IoBulbSharp onClick={onThemeChanger} className={styles.icon}/>
            }
        </div>   
    )
}

export default SettingsComponent;