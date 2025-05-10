import React, {useEffect} from 'react';
import AnimateTitle from './AnimateTitle';
import AnimateChessboard from './AnimateChessboard';
import { useAnimationControls } from 'framer-motion';
import * as styles from './styles.module.css';

function Header() {
    const controls = useAnimationControls();

    const triggerAnimationSequence = async () => {
        await controls.start('write_text')
        await controls.start({opacity: 0});
        await controls.start({display: 'none'});
    }

    useEffect(() => {
        triggerAnimationSequence();
    }, [])

    return(
        <header className={styles.header}>
            <AnimateTitle controls={controls}/>
            <AnimateChessboard controls={controls}/>
        </header>
    )
}

export default Header;