import React, {useEffect} from 'react';
import AnimateTitle from './AnimateTitle';
import AnimateChessboard from './AnimateChessboard';
import { useAnimationControls } from 'framer-motion';
import * as styles from './styles.module.css';

function Header() {
    const titleControls = useAnimationControls();
    const boardControls = useAnimationControls();

    const triggerAnimationSequence = async () => {
        await titleControls.start('write_text')
        await titleControls.start({opacity: 0});
        await titleControls.start({display: 'none'});
        await boardControls.start('show')
    }

    useEffect(() => {
        triggerAnimationSequence();
    }, [])

    return(
        <header className={styles.header}>
            <AnimateTitle controls={titleControls}/>
            <AnimateChessboard controls={boardControls}/>
        </header>
    )
}

export default Header;