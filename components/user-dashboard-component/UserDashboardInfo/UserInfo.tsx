import { NextPage } from 'next';
import { IoMailOutline, IoTimerOutline } from 'react-icons/io5';

import UserInterface from 'interfaces/user';

import styles from '@/styles/dashboard.module.scss';

interface Props {
    user: UserInterface
}

const UserInfo: NextPage<Props> = ({ user }) => {

    const date = new Date(user.created).toLocaleDateString('en-GB')

    return (
        <div className={styles.profile}>
            <div className={styles.avatar}>
                <p></p>
            </div>
            <div className={styles.name}><span>{user.username}</span></div>
            <p>My Profile</p>
            <div className={styles.info}>
                <div className={styles.state}>
                    <IoMailOutline className={styles.icon} />
                    <span>{ user.email }</span>
                </div>
                <div className={styles.state}>
                    <IoTimerOutline className={styles.icon} />
                    <span>{date}</span>
                </div>
            </div>          
        </div> 
    )
}

export default UserInfo;