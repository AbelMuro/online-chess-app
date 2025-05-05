import React, {useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Dialog from '~/assets/Components/Dialog';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';

function DeclareWinner({endMatch}) {
    const checkmate = useSelector(state => state.chess.checkmate.game_over);
    const stalemate = useSelector(state => state.chess.stalemate.game_over);
    const resigns = useSelector(state => state.chess.resigns);
    const buttonRef = useRef();
    const navigate = useNavigate();

    const handleGoBack = () => {
        endMatch();
        navigate('/menu');
    }

    useEffect(() => {
        if(checkmate || resigns || stalemate)
            buttonRef.current.click();
    }, [checkmate, resigns, stalemate])

    return(
        <Dialog 
            Content={() => {
                return(
                    <>
                        <h2 className={styles.dialog_title}>
                            {checkmate && `${checkmate} wins!`}
                            {resigns && `${resigns} resigns!`}
                            {stalemate.game_over && `It's a draw!`} 
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