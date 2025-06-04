import React, {useMemo} from 'react';
import useMediaQuery from '~/Hooks/useMediaQuery';
import DisplayVerticalText from './DisplayVerticalText';
import IndividualMessage from './IndividualMessage';
import AnimateBox from './AnimateBox';
import * as styles from './styles.module.css';

function GrandmasterMessage() {

    return(
        <section className={styles.container}>
            <DisplayVerticalText/>
            <AnimateBox/>
            <div className={styles.message_container}>
                <IndividualMessage message={'[Become a grandmaster today!]'} upperThreshold='0.48' lowerThreshold='0.49'/>
                <IndividualMessage message={'[Challenge the stockfish engine!]'} upperThreshold='0.49' lowerThreshold='0.50'/>
                <IndividualMessage message={'[Expand your knowledge!]'} upperThreshold='0.50' lowerThreshold='0.51'/>  
            </div>
        </section>
    )
}

export default GrandmasterMessage;