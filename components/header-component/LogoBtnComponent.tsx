import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/header.module.scss';

const LogoBtnComponent = () => {

    return (
        <Link href='/'>
           <a><Image src='/icons/logo.svg' alt='logo' width={35} height={35} className={styles.logo}/></a> 
        </Link>            
    )
}

export default LogoBtnComponent