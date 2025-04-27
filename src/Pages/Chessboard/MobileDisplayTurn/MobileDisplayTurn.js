import React from 'react';
import {useSelector} from 'react-redux';
import useMediaQuery from '~/Hooks/useMediaQuery';
import * as styles from './styles.module.css';

function MobileDisplayTurn() {
    const [mobile] = useMediaQuery('(max-width: 620px)');
    const currentTurn = useSelector(state => state.chess.players.current_turn);

    return mobile &&
        <h1 className={styles.currentTurn}>
            {`${currentTurn} to move`}
        </h1>
    
}

export default MobileDisplayTurn;