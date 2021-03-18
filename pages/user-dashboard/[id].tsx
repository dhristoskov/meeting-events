import styles from '@/styles/dashboard.module.scss';

const UserProfilePage = () => {
    return(
        <div className={styles.submenu}>
            <div className={styles.settings}>
                <p className={styles.item}>Create event</p>
                <p className={styles.item}>Profile settings</p>
            </div>        
        </div>
    )
}

export default UserProfilePage;