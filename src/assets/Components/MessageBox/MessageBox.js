import React from 'react';
import {messageBoxVariants} from './Variants';
import {motion, AnimatePresence, useCycle} from 'framer-motion'
import * as styles from './styles.module.css';

//this is where i left off, i will need to create a triangle element for the message box below
function MessageBox({Component, message}) {
    const [isOpen, toggleOpen] = useCycle(false, true);

    const onMouseEnter = () => {
        toggleOpen();
    }

    const onMouseLeave = () => {
        toggleOpen();
    }

    return(
        <div className={styles.container}>
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
            <Component onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
        </div>
    )
}

export default MessageBox;