import { useState, ChangeEvent, FormEvent } from 'react';

import { MessageSend } from 'interfaces/messageSend';
import styles from '@/styles/message.module.scss';

interface Props {
    sendEmailHandler: (emailData: MessageSend) => void;
}

const CreateMessage: React.FC<Props> = ({ sendEmailHandler }) => {

    const [ message, setMessage ] = useState<MessageSend>({
        toPerson: '',
        title: '',
        content: ''
     });

    const { toPerson, title, content } = message;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setMessage({...message, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        sendEmailHandler(message);
        setMessage({
            toPerson: '',
            title: '',
            content: ''
        });
    };

    const onClearFields = (): void  => {
        setMessage({
            toPerson: '',
            title: '',
            content: ''
        });
    }

    return(
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <div className={styles.field}>
                    <input type='text' name='toPerson' placeholder='To:' 
                        value={toPerson} onChange={onHandleChange}/>
                </div>
                <div className={styles.field}>
                    <input type='text' name='title' placeholder='Title:' 
                        value={title} onChange={onHandleChange}/>
                </div>
                <div className={styles.field}>
                    <textarea name='content' value={content} onChange={onHandleChange}/>
                </div>
                <div className={styles.btns}>
                    <input type='submit' value='Send' />
                    <p onClick={onClearFields}>Clear</p>
                </div> 
            </form>
        </div>
    )
}

export default CreateMessage;