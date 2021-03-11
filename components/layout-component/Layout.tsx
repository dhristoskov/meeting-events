import { Fragment, ReactNode, useContext } from 'react';

import HeaderComponent from '@/components/header-component/HeaderComponent';
import { ThemeContext } from 'context/theme-context/ThemeContext';

import styles from '@/styles/layout.module.scss';

interface Props {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    const { isLight } = useContext(ThemeContext)

    return (
        <Fragment>
            <div className={styles.layout} style={{backgroundColor: isLight ? '#D6D6D6' : '#3D3D3D'}}>
                <HeaderComponent />
                { children }
            </div>
        </Fragment>    
    )
}

export default Layout