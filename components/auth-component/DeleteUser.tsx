import { ChangeEvent, FormEvent, useState } from "react";
import { NextPage } from "next";

import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";

import styles from '@/styles/auth.module.scss';

interface Props {
    userDeleteHandler: (data: { password: string }) => void;
}

const DeleteUser: NextPage<Props> = ({ userDeleteHandler }) => {

    const [ passwordData, setPasswordData ] = useState<{password: string }>(
        {
            password: ''
        });

    const { password } = passwordData;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setPasswordData({...passwordData, [name]: value});
    };

    
    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        userDeleteHandler(passwordData)
        setPasswordData({
            password: ''
        });
    };

    return (
        <div className={ styles.container }>
            <h3>Delete User</h3>
            <p className={styles.subtext}>you will DELETE a user profile permanently </p>
            <p className={styles.subtext}>enter password to proceed</p>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <PasswordField onHandleChange={onHandleChange} value={password}/>
                <SubmitButton name={'Delete User'} />
            </form>
        </div>
    )

}

export default DeleteUser;