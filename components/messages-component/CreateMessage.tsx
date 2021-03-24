import { useState, ChangeEvent, FormEvent } from 'react';

import { MessageInterface } from 'interfaces/messageSend';
import styles from '@/styles/message.module.scss';

const CreateMessage = () => {

    const [ message, setMessage ] = useState<MessageInterface>({
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
        console.log(message);
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