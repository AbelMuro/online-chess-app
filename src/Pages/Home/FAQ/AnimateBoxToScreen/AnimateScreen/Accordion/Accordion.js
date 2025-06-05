import React, {useState, useEffect, useRef} from 'react';
import { motion, LayoutGroup, AnimatePresence} from 'framer-motion';
import * as styles from './styles.module.css';

function Accordion({question, answer}) {
    const [expand, setExpand] = useState(false);
    const [height, setHeight] = useState('');
    const accordionRef = useRef();


    const handleExpand = () => {
        setExpand(!expand);
    }


    return(
            <motion.section 
                layout
                className={styles.accordion} 
                onClick={handleExpand}
                ref={accordionRef}
                >
                    <motion.h2 layout className={styles.accordion_question}>
                        Q: {question}
                    </motion.h2>
                    {expand && <motion.p layout className={styles.accordion_answer}>
                        {answer}
                    </motion.p>}                           
            </motion.section>            
    )
}

export default Accordion;