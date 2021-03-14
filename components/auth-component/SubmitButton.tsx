import { Errors } from 'interfaces/errors';

import styles from '@/styles/auth.module.scss';

interface Props {
    name: string;
    errors?: Errors;
}

const SubmitButton: React.FC<Props> = ({ name, errors }) => {

    let error: any;
    if(errors) {
        error = errors.confirm
    }

    return (
        <div className={ styles.field }>
            {error && <p className={styles.errors}>{error}</p>}
            <input type="submit" value={name} />   
        </div>
    )
}

export default SubmitButton;