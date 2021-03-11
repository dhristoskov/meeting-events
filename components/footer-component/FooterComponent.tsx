import { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosMore } from 'react-icons/io';

import styles from '@/styles/footer.module.scss'

const FooterComponent = () => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const openFooterHandler = (): void => {
        setIsOpen(prevState => ! prevState)
    }


    return (
        <Fragment>
            <p className={styles.icon}
                onClick={openFooterHandler}><IoIosMore />
            </p> 
            <div className={styles.footer}>  
                <AnimatePresence>
                {
                    isOpen &&
                    <motion.div 
                    className={styles.options}
                    initial={{ y: 80, opacity: 0}}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: .5 }}
                    >      
                        <p className={styles.item}>contacts</p>               
                        <p className={styles.item}>privacy policy</p>
                        <p className={styles.item}>terms of use</p>
                    </motion.div>  
                }
                </AnimatePresence>
            </div>
        </Fragment>
        
    )
}

export default FooterComponent;