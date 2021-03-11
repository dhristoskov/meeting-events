import { Fragment, ReactNode, useContext } from 'react';

import HeaderComponent from '@/components/header-component/HeaderComponent';
import FooterComponent from '../footer-component/FooterComponent';
import { ThemeContext } from 'context/theme-context/ThemeContext';

import styles from '@/styles/layout.module.scss';

interface Props {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    const { isLight, DarkTheme, LightTheme } = useContext(ThemeContext)

    return (
        <Fragment>
            <div className={styles.layout} style={ (isLight) ? LightTheme : DarkTheme }>
                <HeaderComponent />
                { children }
                <FooterComponent />
            </div>
        </Fragment>    
    )
}

export default Layout