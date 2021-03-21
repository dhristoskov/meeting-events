import { createContext, useState, ReactNode } from 'react';

interface Props {
    children: ReactNode;
};

interface Notification {
    message: string
}

export const NotificationContext = createContext<Notification>({} as Notification)

const NotificationContextProvider: React.FC<Props> = ({ children }) => {

    const [ message ] = useState<string>('')

    return (
        <NotificationContext.Provider 
        value={{
             message 
        }}>
            { children }
        </NotificationContext.Provider>
    )
}

export default NotificationContextProvider

