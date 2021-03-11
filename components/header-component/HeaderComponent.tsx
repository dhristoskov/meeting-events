import SettingsComponent from './SettingsComponent';
import LogoBtnComponent from './LogoBtnComponent';

import styles from '@/styles/header.module.scss';

const HomeComponent = () => {
    return (
        <div className={styles.home}>
           <LogoBtnComponent /> 
           <SettingsComponent />       
        </div>
    )
}

export default HomeComponent;