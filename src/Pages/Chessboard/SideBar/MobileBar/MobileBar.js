import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import * as styles from './styles.module.css';
import ResignButton from '../ResignButton';
import TakeBackButton from '../TakeBackButton';
import RedoButton from '../RedoButton';
import icons from '../icons'

function MobileBar() {
    const dispatch = useDispatch();
    const currentTurn = useSelector(state => state.chess.current_turn);


    const handleTakeBack = () => {
        dispatch({type: 'UNDO'})
    }
    
    const handleForward = () => {
        dispatch({type: 'REDO'})
    }

    return(
        <section className={styles.container}>
            <div className={styles.buttons}>
                <TakeBackButton/>
                <RedoButton/>
            </div>
            <ResignButton/>
        </section>
    )
}

export default MobileBar;