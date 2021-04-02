import { ReactNode } from 'react';

import NotificationProvider from 'context/notification-context/Notification';
import ThemeContextProvider from 'context/theme-context/ThemeContext';
import ReservationContextProvider from 'context/reservation-context/ReservationContext';

interface Props {
    children: ReactNode
}

const ContextLayout: React.FC<Props> = ({ children }) => {
    return (
        <ThemeContextProvider>
            <NotificationProvider>
                <ReservationContextProvider>
                    { children } 
                </ReservationContextProvider>  
            </NotificationProvider>
        </ThemeContextProvider>
    )
}

export default ContextLayout;