import { useState, ChangeEvent } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import styles from '@/styles/auth.module.scss';

interface Props {
    value: string;
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    errors: any
}

const PasswordField: React.FC<Props> = ({ value, onHandleChange, errors}) => {

    const [ hidden, setHidden ] = useState<Boolean>(true);

    const toggleVisibal = () => {
        setHidden(prevState => !prevState);
    }

    return (
        <div className={styles.field}>
            <input type={ hidden ? 'password' : 'text' } name='password' value={value}
            onChange={onHandleChange} placeholder='Password'/>
            <span onClick={toggleVisibal}>
                {
                    hidden 
                    ? <i className={styles.passwordIcon}><MdVisibilityOff /></i>
                    : <i className={styles.passwordIcon}><MdVisibility  /></i> 
                }
            </span>
            {errors && <p className={styles.errors}>{errors}</p>}
        </div>       
    )
}

export default PasswordField;