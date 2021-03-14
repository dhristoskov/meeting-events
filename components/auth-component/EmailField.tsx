import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Errors } from 'interfaces/errors';

import styles from '@/styles/auth.module.scss';

interface Props {
    value: string;
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    errors: Errors;
}

const EmailField: React.FC<Props> = ({ value, onHandleChange, errors}) => {

    const [ addEmail, onEmailAdd ] = useState(false);

    return (
        <div className={styles.field}>
        {
            !addEmail && 
            <p onClick={() => onEmailAdd(true)} className={styles.email}>
                Click to add E-mail for more security
            </p>
        }
        {
            addEmail && 
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .7 }}>
                <input type="text" name='email' placeholder='E-mail'
                value={value} onChange={onHandleChange} />   
                {errors && <p className={styles.errors}>{errors}</p>}  
            </motion.div>
        }
    </div>
    )
}

export default EmailField;
