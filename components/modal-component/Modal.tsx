import { Fragment, ReactNode } from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';

import Overlay from './Overlay';

import styles from '@/styles/modal.module.scss';

interface Props {
    children: ReactNode;
    isVisible: boolean;
    setIsVisible: (state: boolean) => void;
};

const Modal: NextPage<Props> = ({ isVisible, children, setIsVisible }) => {

    return(
        <Fragment>
            {
            isVisible  &&  
            <Fragment>
                <Overlay setIsVisible={setIsVisible}/>
                <motion.div 
                    className={styles.modal}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    >
                    { children }
                </motion.div>
            </Fragment>
            }    
        </Fragment>
      
    )
}

export default Modal