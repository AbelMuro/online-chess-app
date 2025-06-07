import React from 'react';
import {messageBoxVariants} from './Variants';
import {motion, AnimatePresence, useCycle} from 'framer-motion'
import * as styles from './styles.module.css';

function MessageBox({Component, message}) {
    const [isOpen, toggleOpen] = useCycle(false, true);

    const onMouseEnter = () => {
        toggleOpen();
    }

    const onMouseLeave = () => {
        toggleOpen();
    }

    const handleClick = () => {
        toggleOpen();
    }

    return(
        <Component onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={handleClick}>
            <AnimatePresence>
                {isOpen && <motion.div 
                    className={styles.message}
                    initial={'closed'}
                    animate={'open'}
                    variants={messageBoxVariants}
                    exit={'closed'}
                    >
                        {message}
                        <div className={styles.triangle}/>
                </motion.div>}                
            </AnimatePresence>
        </Component>
    )
}

export default MessageBox;