import SettingsComponent from './SettingsComponent';

import styles from '@/styles/header.module.scss';

const HomeComponent = () => {
    return (
        <div className={styles.home}>
           <p>Logo</p> 
           <SettingsComponent />       
        </div>
    )
}

export default HomeComponent;