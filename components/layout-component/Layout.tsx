import { Fragment, ReactNode, useContext } from 'react';

import HeaderComponent from '@/components/header-component/HeaderComponent';
import FooterComponent from '../footer-component/FooterComponent';
import AuthContextProvider from 'context/auth-context/AuthContext';
import { ThemeContext } from 'context/theme-context/ThemeContext';

import styles from '@/styles/layout.module.scss';

interface Props {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    const { isLight, DarkTheme, LightTheme } = useContext(ThemeContext)

    return (
        <Fragment>
            <AuthContextProvider>
                <div className={styles.layout} style={ (isLight) ? LightTheme : DarkTheme }>
                    <HeaderComponent />
                    { children }
                    <FooterComponent />
                </div>
            </AuthContextProvider>
        </Fragment>    
    )
}

export default Layout