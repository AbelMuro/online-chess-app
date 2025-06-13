import React, {useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Dialog from '~/Common/Components/Dialog';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';

function DeclareWinner() {
    const checkmate = useSelector(state => state.chess.checkmate.game_over);
    const stalemate = useSelector(state => state.chess.stalemate.game_over);
    const playerRanOutOfTime = useSelector(state => state.chess.out_of_time);
    const forfeit = useSelector(state => state.chess.forfeit);
    const resigns = useSelector(state => state.chess.resigns);
    const buttonRef = useRef();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/menu');
    }

    useEffect(() => {
        if(checkmate || resigns || stalemate || playerRanOutOfTime.player)
            buttonRef.current.click();
        else if(!checkmate && !resigns && !stalemate && !playerRanOutOfTime.player && forfeit)      // if one player checkmates another player,
            buttonRef.current.click();                                                              // and then leaves the page, it will close the websocket 
    }, [checkmate, resigns, stalemate, playerRanOutOfTime, forfeit])                                // and trigger a dispatch for the forfeit property of the state




    return(
        <Dialog 
            Content={() => {
                return(
                    <>
                        <h2 className={styles.dialog_title}>
                            {checkmate && `${checkmate} wins!`}
                            {resigns && `${resigns} resigns!`}
                            {stalemate && `It's a draw!`} 
                            {forfeit && 'Opponent has left the match, you win by default'}
                            {playerRanOutOfTime.player && `${playerRanOutOfTime.player} ran out of time!`}
                        </h2>
                        <button className={styles.dialog_button} onClick={handleGoBack}>
                            Ok
                        </button>
                    </>
                )
            }}
            Button={({handleOpen}) => {
                return(
                    <button onClick={handleOpen} className={styles.ignore} ref={buttonRef}/>
                )
            }}/>
    )
}

export default DeclareWinner;