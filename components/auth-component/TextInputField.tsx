import { ChangeEvent } from 'react';
import { Errors } from 'interfaces/errors';

import styles from '@/styles/auth.module.scss';

interface Props {
    name: string;
    placeholder?: string;
    value: string;
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    errors?: Errors;
}

const TextInputField: React.FC<Props> = ({ value, onHandleChange, errors, name, placeholder}) => {

    return(
        <div className={styles.field}>
            <input type='text' name={name} placeholder={placeholder}  
            value={value} onChange={onHandleChange} />
            {errors && <p className={styles.errors}>{errors}</p>}
        </div>
    )
}

export default TextInputField