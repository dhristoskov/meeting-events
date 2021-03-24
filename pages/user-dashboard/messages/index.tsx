import { useContext } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

import CreateMessage from "@/components/messages-component/CreateMessage"
import { Notification } from 'context/notification-context/Notification';
import MessageInterface from 'interfaces/message';
import { MessageSend } from 'interfaces/messageSend';

const Messages = () => {

    const router = useRouter();
    const { showNotification } = useContext(Notification);

    const sendEmailHandler = (emailData: MessageSend) => { 
        const token = cookie.get('token');
        axios.post<MessageInterface>('/api/message', emailData, 
            { headers: 
                { 
                    Authorization: token, 
                    'Content-Type': 'application/json'
                } 
            })
             .then(res => {
                showNotification({message: 'Email send', type: 'succses'})
                router.push('/user-dashboard');
             }).catch(err => {
                showNotification({message: err.response.data.msg, type: 'alert'});
             });
    }

    return (
        <CreateMessage sendEmailHandler={sendEmailHandler}/>
    )
}

export default Messages