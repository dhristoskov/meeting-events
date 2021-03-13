import styles from '@/styles/auth.module.scss';

interface Props {
    name: string;
}

const SubmitButton: React.FC<Props> = ({ name }) => {
    return (
        <div className={styles.field}>
            <input type="submit" value={name}/>   
        </div>
    )
}

export default SubmitButton;