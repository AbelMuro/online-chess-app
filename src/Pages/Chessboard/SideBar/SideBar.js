import React from 'react';
import TakeBackButton from './TakeBackButton';
import ShowMoves from './ShowMoves';
import ResignButton from './ResignButton'
import RedoButton from './RedoButton';
import {useSelector} from 'react-redux'
import * as styles from './styles.module.css';
import MobileBar from './MobileBar';
import { useMediaQuery } from '~/Hooks';

function SideBar(){
    const currentTurn = useSelector(state => state.chess.current_turn);
    const [mobile] = useMediaQuery('(max-width: 620px)');

    return mobile ? <MobileBar/> :
        <aside className={styles.bar}>
            <h1 className={styles.bar_title}>
                {`${currentTurn} to move`}
            </h1>
            <ShowMoves/>
            <div className={styles.bar_buttons}>
                <ResignButton/>
                <TakeBackButton/>
                <RedoButton/>
            </div>
        </aside>
    
}

export default SideBar;