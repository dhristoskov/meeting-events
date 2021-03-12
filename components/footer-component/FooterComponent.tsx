import { Fragment, useState } from 'react';
import { motion, AnimatePresence, useCycle } from 'framer-motion';
import { IoIosArrowUp } from 'react-icons/io';

import styles from '@/styles/footer.module.scss'

const FooterComponent = () => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [animate, cycle] = useCycle<{rotate: number}>(
        { rotate: 0 },
        { rotate: 180 }
    );

    const openFooterHandler = (): void => {
        setIsOpen(prevState => ! prevState)
    }


    return (
        <Fragment>
            <motion.p className={styles.icon}
                onClick={openFooterHandler}
                animate={animate}
                onTap={() => cycle()}
                transition={{ duration: .5}}
                ><IoIosArrowUp />
            </motion.p> 
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