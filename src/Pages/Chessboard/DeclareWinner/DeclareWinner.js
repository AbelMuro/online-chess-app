import React, {useRef, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Dialog from '~/Common/Components/Dialog';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';

function DeclareWinner() {
    const [message, setMessage] = useState('');
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
        if(checkmate)
            setMessage(`${checkmate} wins the game!`);
        else if(resigns)
            setMessage(`${resigns} resigns`)
        else if(stalemate)
            setMessage(`It's a draw`);
        else if(playerRanOutOfTime.player)
            setMessage(`${playerRanOutOfTime.player} ran out of time`)
        else if(forfeit)
            setMessage('Opponent has left the match, you win by default');

        
    }, [checkmate, resigns, stalemate, playerRanOutOfTime, forfeit])                           

    useEffect(() => {
        if(!message) return;

        buttonRef.current.click();

    }, [message])


    return(
        <Dialog 
            Content={() => {
                return(
                    <>
                        <h2 className={styles.dialog_title}>
                            {message}
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