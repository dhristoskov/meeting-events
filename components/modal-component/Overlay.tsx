import { NextPage } from 'next';

import styles from '@/styles/modal.module.scss';

interface Props {
    setIsVisible: (state: boolean) => void;
};

const Overlay: NextPage<Props> = ({ setIsVisible }) => {

    return (
        <div 
            className={styles.overlay} 
            onClick={() => setIsVisible(false)}
        />
      );
}

export default Overlay;