import React from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '~/Hooks';
import * as styles from './styles.module.css';

function MobileDisplayTurn() {
    const [mobile] = useMediaQuery('(max-width: 620px)');
    const currentTurn = useSelector(state => state.chess.current_turn);

    return mobile &&
        <h1 className={styles.currentTurn} style={currentTurn === 'white' ? {color: 'rgb(206, 206, 206)'} : {color: 'rgb(34, 34, 34)'}}>
            {`${currentTurn} to move`}
        </h1>
    
}

export default MobileDisplayTurn;