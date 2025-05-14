import React, {useEffect} from 'react';
import AnimateBackgroundSmudge from './AnimateBackgroundSmudge';
import AnimateTitle from './AnimateTitle';
import DisplayPieces from './DisplayPieces';
import AnimateStartButton from './AnimateStartButton';
import { useAnimationControls } from 'framer-motion';
import * as styles from './styles.module.css';

function Header() {
    const smudgeControls = useAnimationControls();
    const titleControls = useAnimationControls();
    const buttonControls = useAnimationControls();

    const triggerAnimationSequence = async () => {
        smudgeControls.start('show');
        await titleControls.start('write_text');
        await buttonControls.start('show');
        await smudgeControls.start('heartbeat');
    }

    useEffect(() => {
        triggerAnimationSequence();
    }, [])

    return(
        <header className={styles.header}>
            <AnimateBackgroundSmudge controls={smudgeControls}/>
            <AnimateTitle controls={titleControls}/>
            <DisplayPieces/>
            <AnimateStartButton controls={buttonControls}/>
        </header>
    )
}

export default Header;