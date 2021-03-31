import { NextPage } from 'next';

import styles from '@/styles/modal.module.scss';

interface Props {
    onModalClose: () => void;
};

const Overlay: NextPage<Props> = ({ onModalClose }) => {

    return (
        <div 
            className={styles.overlay} 
            onClick={onModalClose}
        />
      );
}

export default Overlay;