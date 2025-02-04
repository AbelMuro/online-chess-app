import React, {useState, useRef, useEffect} from 'react';
import Dialog from '~/assets/Components/Dialog';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';

function DeclareWinner() {
    const checkmate = useSelector(state => state.chess.checkmate);
    const resigns = useSelector(state => state.chess.resigns);
    const buttonRef = useRef();

    useEffect(() => {
        if(checkmate || resigns)
            buttonRef.current.click();
    }, [checkmate, resigns])

    return(
        <Dialog 
            Content={({handleOpen}) => {
                return(
                    <>
                        <h2 className={styles.dialog_title}>
                            {checkmate && `${checkmate} wins!`}
                            {resigns && `${resigns} resigns!`}
                        </h2>
                        <button className={styles.dialog_button} onClick={handleOpen}>
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