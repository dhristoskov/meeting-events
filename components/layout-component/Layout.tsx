import { Fragment, ReactNode, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { NextPage } from 'next';

import HeaderComponent from '@/components/header-component/HeaderComponent';
import FooterComponent from '../footer-component/FooterComponent';
import AuthContextProvider from 'context/auth-context/AuthContext';
import NotificationComponent from '@/components/notification-component/NotificationComponent';
import { ThemeContext } from 'context/theme-context/ThemeContext';
import { Notification } from 'context/notification-context/Notification';
import { ReservationContext } from 'context/reservation-context/ReservationContext';

import styles from '@/styles/layout.module.scss';
import CustomersData from '../reservation-component/CustomersData';

interface Props {
    children: ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {

    const { isLight, DarkTheme, LightTheme } = useContext(ThemeContext);
    const { setCities } = useContext(ReservationContext);
    const { activeNotification } = useContext(Notification);

    useEffect(() => {
        const url = 'http://localhost:3000/api/restaurant/get-citynames';
        axios.get(url)
             .then( res => {
                setCities(res.data.cities)
            }).catch(err => {
                console.log(err)
            });
    }, [])


    return (
        <Fragment>
            <AuthContextProvider>
                <div className={styles.layout} style={ ( isLight ) ? LightTheme : DarkTheme }>
                    <HeaderComponent />
                    { children }
                    <FooterComponent />
                </div>
                 {/* <div className={styles.sidebar}></div> */}
                <AnimatePresence>
                {
                    activeNotification && 
                    <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .5 }}>
                        <NotificationComponent message={activeNotification.message} type={activeNotification.type}/>
                    </motion.div>
                }
                </AnimatePresence>
            </AuthContextProvider>
        </Fragment>    
    )
}

export default Layout;