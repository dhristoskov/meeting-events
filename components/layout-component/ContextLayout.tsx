import { ReactNode } from 'react';

import NotificationProvider from 'context/notification-context/Notification';
import ThemeContextProvider from 'context/theme-context/ThemeContext';

interface Props {
    children: ReactNode
}

const ContextLayout: React.FC<Props> = ({ children }) => {
    return (
        <ThemeContextProvider>
            <NotificationProvider>
                    { children }  
            </NotificationProvider>
        </ThemeContextProvider>
    )
}

export default ContextLayout;