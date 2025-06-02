import React, {useMemo} from 'react';
import useMediaQuery from '~/Hooks/useMediaQuery';
import DisplayVerticalText from './DisplayVerticalText';
import IndividualMessage from './IndividualMessage';
import AnimateBlock from './AnimateBlock';
import * as styles from './styles.module.css';

function GrandmasterMessage() {
    const [mobile] = useMediaQuery('(max-width: 500px)');
    const [tablet] = useMediaQuery('(max-width: 700px)');

    const BlockComponent = useMemo(() => {
        if(mobile)
            return <AnimateBlock fromX={0} toX={-10} blurUpperThreshold={0.53} blurLowerThreshold={0.55}/>
        else if(tablet)
            return <AnimateBlock fromX={0} toX={-10} blurUpperThreshold={0.50} blurLowerThreshold={0.52}/>
        else
            return <AnimateBlock fromX={0} toX={-270} blurUpperThreshold={0.53} blurLowerThreshold={0.55}/>

    }, [mobile, tablet])
    

    return(
        <section className={styles.container}>
            <DisplayVerticalText/>
            {BlockComponent}
            <div className={styles.message_container}>
                <IndividualMessage message={'[Become a grandmaster today!]'} upperThreshold='0.48' lowerThreshold='0.49'/>
                <IndividualMessage message={'[Challenge the stockfish engine!]'} upperThreshold='0.49' lowerThreshold='0.50'/>
                <IndividualMessage message={'[Expand your knowledge!]'} upperThreshold='0.50' lowerThreshold='0.51'/>  
            </div>
        </section>
    )
}

export default GrandmasterMessage;