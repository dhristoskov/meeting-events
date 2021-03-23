import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
    children: ReactNode;
}

const IconCompnent: React.FC<Props> = ({ children }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, originY: 0, transition: { duration: .3 } }}
            whileTap={{ scale: 0.95 }}
            >
                { children }
        </motion.div>
    )
}

export default IconCompnent;