import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {motion, AnimatePresence} from 'framer-motion';
import * as styles from './styles.module.css';
import {messageBoxVariants} from './Variants';

function DisplayMessage() {
    const message = useSelector(state => state.message.message)
    const dispatch = useDispatch();

    const handleClose = () => {

    }

    useEffect(() => {
        if(message)
            setTimeout(() => {
                dispatch({type: 'RESET_MESSAGE'})
            }, 5000)
    }, [message])

    return (
        <AnimatePresence>
            {
             message &&   
                <motion.div 
                    className={styles.container} 
                    variants={messageBoxVariants}
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    >
                        <p className={styles.message}>
                            {message}
                        </p>
                        <button className={styles.close} onClick={handleClose}>
                            x
                        </button>
                </motion.div>  
            }
        </AnimatePresence>
    )
}

export default DisplayMessage;