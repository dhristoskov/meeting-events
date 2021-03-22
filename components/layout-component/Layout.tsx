import { Fragment, ReactNode, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import HeaderComponent from '@/components/header-component/HeaderComponent';
import FooterComponent from '../footer-component/FooterComponent';
import AuthContextProvider from 'context/auth-context/AuthContext';
import NotificationComponent from '@/components/notification-component/NotificationComponent';
import { ThemeContext } from 'context/theme-context/ThemeContext';
import { Notification } from 'context/notification-context/Notification';

import styles from '@/styles/layout.module.scss';

interface Props {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    const { isLight, DarkTheme, LightTheme } = useContext(ThemeContext);
    const { activeNotification } = useContext(Notification)

    return (
        <Fragment>
            <AuthContextProvider>
                <div className={styles.layout} style={ ( isLight ) ? LightTheme : DarkTheme }>
                    <HeaderComponent />
                    { children }
                    <FooterComponent />
                </div>
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

export default Layout