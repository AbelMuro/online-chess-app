import React from 'react';
import Timer from './Timer';
import PiecesTaken from './PiecesTaken';
import ShowMoves from './ShowMoves';
import ResignButton from './ResignButton'
import TakeBackButton from './TakeBackButton';
import RedoButton from './RedoButton';
import {useSelector} from 'react-redux'
import * as styles from './styles.module.css';
import MobileBar from './MobileBar';
import useMediaQuery from '~/Hooks/useMediaQuery';

function SideBar(){
    const currentTurn = useSelector(state => state.chess.current_turn);
    const [mobile] = useMediaQuery('(max-width: 620px)');

    return mobile ? <MobileBar/> :
        <aside className={styles.bar}>
            <h1 className={styles.bar_title}>
                {`${currentTurn} to move`}
            </h1>
            <Timer/>
            <PiecesTaken/>
            <ShowMoves/>
            <div className={styles.bar_buttons}>
                <ResignButton/>
                <TakeBackButton/>
                <RedoButton/>
            </div>
        </aside>
    
}

export default SideBar;