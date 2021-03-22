import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface Props {
    children: ReactNode;
};

interface NotificationMessage {
    message: string;
    type: string;
}

interface Notification {
    activeNotification: NotificationMessage;
    showNotification: (notification: NotificationMessage) => void;
}

export const Notification = createContext<Notification>({} as Notification)

const NotificationProvider: React.FC<Props> = ({ children }) => {

    const [ activeNotification, setActiveNotification ] = useState<NotificationMessage>(null);

    const showNotification = useCallback((notification: NotificationMessage) => {
        setActiveNotification(notification)
    }, []);

    useEffect(() => {
        if(activeNotification){
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 2500);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification]);

    return (
        <Notification.Provider 
        value={{
            activeNotification,
            showNotification
        }}>
            { children }
        </Notification.Provider>
    )
}

export default NotificationProvider

