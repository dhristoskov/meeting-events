import { useState } from 'react';
// import Link from 'next/link';

import styles from '@/styles/dashboard.module.scss';

const UserSettings = () => {

    return (
        <div className={styles.settings}>
            <div className={styles.menu}>
                <p>Add/Change E-mail</p>
                <p>Change password</p>
                <p>Wallet</p>
                <p>Delete profile</p>
                    {/* <Link href='/user-dashboard/settings'>
                        <a className={styles.item}>Settings</a></Link> */}
            </div>
        </div>     
    )

}

export default UserSettings;