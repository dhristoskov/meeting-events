import { Fragment, ReactNode } from 'react';

import HeaderComponent from '@/components/header-component/HeaderComponent';

import styles from '@/styles/layout.module.scss';

interface Props {
    children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    return (
        <Fragment>
            <HeaderComponent />
            <div className={styles.layout}>
                { children }
            </div>
        </Fragment>    
    )
}

export default Layout