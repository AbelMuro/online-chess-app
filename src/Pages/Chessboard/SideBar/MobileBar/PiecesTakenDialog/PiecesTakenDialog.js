import React from 'react';
import icons from '~/assets/icons';
import Dialog from '~/assets/Components/Dialog';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';

function PiecesTakenDialog(){
    const blackPiecesTaken = useSelector(state => state.chess.moves.black_pieces_taken);
    const whitePiecesTaken = useSelector(state => state.chess.moves.white_pieces_taken);
    
    return(
        <Dialog
            Content={({handleOpen}) => {
                return(
                    <>
                        <h2 className={styles.dialog_title}>
                            Pieces Taken
                        </h2>
                        <div className={styles.dialog_pieces_white}>
                            {
                                whitePiecesTaken.map((piece) => {
                                    const pieceImage = piece.split(' ')[1];
                                    return (
                                        <img src={icons[`white ${pieceImage}`]} key={piece}/>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.dialog_pieces_black}>
                            {
                                blackPiecesTaken.map((piece) => {
                                    const pieceImage = piece.split(' ')[1];
                                    return (
                                        <img src={icons[`black ${pieceImage}`]} key={piece}/>
                                    )
                                })
                            }
                        </div>
                        <button className={styles.dialog_button} onClick={handleOpen}>
                            OK
                        </button>
                    </>
                )
            }}
            Button={({handleOpen}) => {
                return(
                    <button onClick={handleOpen} className={styles.button}>
                        Pieces Taken
                    </button>
                )
            }}
        />
    );
}

export default PiecesTakenDialog;