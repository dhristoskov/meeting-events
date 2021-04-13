import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 

import SettingsComponent from './SettingsComponent';
import LogoBtnComponent from './LogoBtnComponent';
import CityPicker from './CityPicker';
import Search from './Search';

import styles from '@/styles/header.module.scss';
import UpperHeader from './UpperHeader';
import { Fragment } from 'react';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

const HeaderComponent = () => {
    return (
        <Fragment>
            <UpperHeader />
            <div className={styles.home}>
                <div className={styles.left}>
                    <LogoBtnComponent /> 
                    <CityPicker />
                    <Search />             
                </div>  
                <SettingsComponent />             
            </div>
        </Fragment>
   
    )
}

export default HeaderComponent;