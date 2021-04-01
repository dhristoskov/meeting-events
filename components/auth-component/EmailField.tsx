import { ChangeEvent } from 'react';
import { Errors } from 'interfaces/errors';

import styles from '@/styles/auth.module.scss';

interface Props {
    value: string;
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    errors?: Errors;
}

const EmailField: React.FC<Props> = ({ value, onHandleChange, errors}) => {

    return (
        <div className={styles.field}>
            <input type="text" name='email' placeholder='E-mail' value={value} onChange={onHandleChange} />   
            {errors && <p className={styles.errors}>{errors}</p>}  
        </div>
    )
}

export default EmailField;
