import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 

import SettingsComponent from './SettingsComponent';
import LogoBtnComponent from './LogoBtnComponent';

import styles from '@/styles/header.module.scss';
import CityPicker from './CityPicker';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

const HeaderComponent = () => {
    return (
        <div className={styles.home}>
           <LogoBtnComponent /> 
           <CityPicker />
           <SettingsComponent />       
        </div>
    )
}

export default HeaderComponent;