import React from 'react';
import Timer from './Timer';
import PiecesTaken from './PiecesTaken';
import ShowMoves from './ShowMoves';
import ResignButton from './ResignButton'
import TakeBackButton from './TakeBackButton';
import RedoButton from './RedoButton';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux'
import * as styles from './styles.module.css';
import MobileBar from './MobileBar';
import useMediaQuery from '~/Hooks/useMediaQuery';

function SideBar(){
    const {matchId} = useParams();
    const currentTurn = useSelector(state => state.chess.current_turn);
    const [mobile] = useMediaQuery('(max-width: 620px)');


    return mobile ? <MobileBar/> :
        <aside className={styles.bar}>
            <h1 className={styles.bar_title}>
                {`${currentTurn} to move`}
            </h1>
            {matchId !== 'ai' && <Timer/>}
            <PiecesTaken/>
            <ShowMoves/>
            <div className={styles.bar_buttons}>
                <ResignButton/>
                {matchId === 'ai' && <TakeBackButton/>}
                {matchId === 'ai' && <RedoButton/>}
            </div>
        </aside>
    
}

export default SideBar;