import React from 'react';
import { squareCoordinates } from '~/assets/SquareCoordinates';
import icons from '~/assets/icons';
import {useSelector} from 'react-redux';
import Dialog from '~/Common/Components/Dialog';
import * as styles from './styles.module.css';

function ShowMovesDialog() {
    const moves = useSelector(state => state.chess.moves.all);
    
    return(
        <Dialog
            Content={({handleOpen}) => {
                return(
                    <>
                        <h2 className={styles.dialog_title}>
                            All Moves
                        </h2>
                        <div className={styles.dialog_pieces}>
                        {
                            moves && moves.map((move, i) => {
                                const from = move.from;
                                const to = move.to;
                                const pieceToBeMoved = move.pieceToBeMoved;
                                const pieceToBeTaken = move.pieceToBeTaken;   
                                const piece_color = pieceToBeMoved.includes('white') ? 'white' : 'black';
                                const castleling = move.castleling;
                                let piece = pieceToBeMoved.slice(0, pieceToBeMoved.length - 2);         
                                let pieceTaken = pieceToBeTaken.slice(0, pieceToBeTaken.length - 2);               
                            
                                const fromSquare = squareCoordinates[from.row][from.column];
                                const toSquare = squareCoordinates[to.row][to.column];

                                return(
                                    <p className={styles.dialog_pieces_move} key={`${i} ${fromSquare} ${toSquare}`}>
                                        <img src={icons[piece]}/>
                                        {castleling && ' - '}
                                        {castleling && <img src={icons[`${piece_color} rook`]}/>}
                                        {pieceTaken && ` x `}
                                        {pieceTaken && <img src={icons[pieceTaken]}/>}
                                        {`${toSquare}`}
                                    </p>
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
                        Show Moves
                    </button>
                )
            }}
        />
    );
}

export default ShowMovesDialog;