import { Fragment, useState, useContext, ReactElement } from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import cookie from 'js-cookie';

import Modal from '@/components/modal-component/Modal';
import ChangePassowrd from '@/components/auth-component/ChangePassword';
import ChangeEmail from '@/components/auth-component/ChangeEmail';

import { Notification } from 'context/notification-context/Notification';

import styles from '@/styles/dashboard.module.scss';

interface Props {
    refreshData: () => void;
}

const UserSettings: NextPage<Props> = ({ refreshData }) => {

    const { showNotification } = useContext(Notification);
    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ emit, setEmit ] = useState<string>('')

    const onEmailChange = (emit: string): void => {
        setIsVisible(true);
        setEmit(emit);
    }
    

    const changeEmailHandler = (emailData: { email: string }) => { 
        const token = cookie.get('token');
        axios.put<{msg: string}>('/api/auth/update-user', emailData, 
            { headers: 
                { 
                    Authorization: token, 
                    'Content-Type': 'application/json'
                } 
            })
             .then(res => {
                showNotification({message: 'Email changed', type: 'succses'});
                setIsVisible(false);
                refreshData();
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
                setIsVisible(false);
             });
    };

    const changePasswordHandler = (userData: {password2: string, password: string }) => {
        const token = cookie.get('token');
        axios.put<{msg: string}>('/api/auth/change-password', userData, 
            { headers: 
                { 
                    Authorization: token, 
                    'Content-Type': 'application/json'
                } 
            })
             .then(res => {
                showNotification({message: 'Password changed', type: 'succses'})
                setIsVisible(false);
                refreshData();
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
                setIsVisible(false);
             });
    }

    const onBtnSwitcher = (): ReactElement => {
        switch(emit){
            case 'email':  return  <ChangeEmail changeEmailHandler={changeEmailHandler}/>
            case 'password': return <ChangePassowrd changePasswordHandler={changePasswordHandler}/>
            case 'delete': return 
            default: return
        }
    }

    return (
        <Fragment>
            <Modal 
                isVisible={isVisible} 
                setIsVisible={setIsVisible}>
                    { onBtnSwitcher() }
            </Modal>
            <div className={styles.settings}>
                <div className={styles.menu}>
                    <p onClick={() => onEmailChange('email')}>Add/Change E-mail</p>
                    <p onClick={() => onEmailChange('password')}>Change password</p>
                    <p onClick={() => onEmailChange('delete')}>Delete profile</p>
                    <p>Wallet</p>
                </div>
            </div> 
        </Fragment>
    )

}

export default UserSettings;