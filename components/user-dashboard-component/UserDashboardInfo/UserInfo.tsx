import { useContext } from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import cookie from 'js-cookie';
import Image from 'next/image';
import { IoMailOutline, IoTimerOutline } from 'react-icons/io5';

import UserInterface from 'interfaces/user';
import UserAvatar from '@/components/auth-component/UserAvatar';
import { Notification } from 'context/notification-context/Notification';

import styles from '@/styles/dashboard.module.scss';

interface Props {
    user: UserInterface;
    refreshData: () => void;
}

const UserInfo: NextPage<Props> = ({ user, refreshData }) => {

    const date = new Date(user.created).toLocaleDateString('en-GB');
    const { showNotification } = useContext(Notification);

    const changeImageHandler = async ( data: {avatar: string} ) => { 
        const token = cookie.get('token');
        await axios.put<{msg: string}>('/api/auth/update-user', data, 
            { headers: 
                { 
                    Authorization: token, 
                    'Content-Type': 'application/json'
                } 
            })
             .then(res => {
                showNotification({message: 'Image updated', type: 'succses'});
                refreshData();
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    };

    return (
        <div className={styles.profile}>
            <div className={styles.avatar}>
                {
                    user.avatar !== 'no-data' 
                    && <Image className={styles.img} src={user.avatar} alt='avatar' width={130} height={130}/>
                }               
                <UserAvatar 
                    user={user} 
                    changeImageHandler={changeImageHandler}
                />
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