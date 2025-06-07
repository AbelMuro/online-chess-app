import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {overlayVariant, dialogVariant} from './Variants/Variants';
import * as styles from './styles.module.css';

function Dialog({Content, Button}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    return(
        <>
            <AnimatePresence>
                {open && <motion.div 
                    className={styles.overlay} 
                    variants={overlayVariant}
                    initial={'close'}
                    animate={'open'}
                    exit={'close'}
                    >
                        <motion.dialog 
                            open={open} 
                            initial={'close'} 
                            animate={'open'} 
                            exit={'close'}
                            className={styles.dialog} 
                            variants={dialogVariant}>
                                <Content handleOpen={handleOpen}/>                
                        </motion.dialog>
                </motion.div>}     
            </AnimatePresence>
            <Button handleOpen={handleOpen}/>
        </>
    )
}

export default Dialog;