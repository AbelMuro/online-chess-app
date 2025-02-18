import React, {useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Dialog from '~/assets/Components/Dialog';
import {useSelector, useDispatch} from 'react-redux';
import * as styles from './styles.module.css';

function DeclareWinner() {
    const dispatch = useDispatch();
    const checkmate = useSelector(state => state.chess.checkmate);
    const stalemate = useSelector(state => state.chess.stalemate);
    const resigns = useSelector(state => state.chess.resigns);
    const buttonRef = useRef();
    const navigate = useNavigate();

    const handleGoBack = () => {
        dispatch({type: 'RESET_STATE'});
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
                            {stalemate && `It's a draw!`} 
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