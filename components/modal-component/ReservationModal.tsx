import { Fragment, ReactNode } from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';

import Overlay from './Overlay';

import styles from '@/styles/modal.module.scss';

interface Props {
    children: ReactNode;
    isVisible: boolean;
    onModalClose: () => void;
};

const ReservationModal: NextPage<Props> = ({ isVisible, children, onModalClose }) => {

    return(
        <Fragment>
            {
            isVisible  &&  
            <Fragment>
                <Overlay onModalClose={onModalClose}/>
                <motion.div 
                    className={styles.modal}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ duration: .8 }}
                    >
                    { children }
                </motion.div>
            </Fragment>
            }    
        </Fragment>
      
    )
}

export default ReservationModal