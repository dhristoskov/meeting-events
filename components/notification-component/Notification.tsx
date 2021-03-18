import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from '@/styles/notification.module.scss';

// interface Props {
//     type: string;
//     message: string;
// }

const Notification = () => {

    const [ isOpen, setIsOpen ] = useState<boolean>(true);
    let type = 'success'

    useEffect(() => {
        if(isOpen){
            const timer = setTimeout(() => {
                setIsOpen(false)
            }, 5000);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {
                isOpen &&   
                <motion.div 
                className={styles.notification}
                initial={{ opacity: 0}}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .5 }}
                >
                    <div className={type === 'alert' ? styles.alert : styles.success}>
                        <p className={styles.message}>Message</p>
                    </div>                  
                </motion.div>
            }         
        </AnimatePresence>
      
    )
}

export default Notification;