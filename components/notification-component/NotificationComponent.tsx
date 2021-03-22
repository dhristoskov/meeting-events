import styles from '@/styles/notification.module.scss';

interface Props {
    message: string;
    type: string;   
}

const NotificationComponent: React.FC<Props> = ({ message, type }) => {

    return (
        <div className={styles.notification}>
            <div className={type === 'alert' ? styles.alert : styles.success}>
                <p className={styles.message}>{ message }</p>
            </div>                  
        </div>      
    )
}

export default NotificationComponent;