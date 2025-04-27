import React, {useRef} from 'react';
import {squareCoordinates} from './SquareCoordinates';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';
import icons from '~/assets/icons';

function ShowMoves() {
    const moves = useSelector(state => state.chess.moves.all);
    const movesBox = useRef();



    return (
        <section className={styles.container}>
            <h2>
                Moves
            </h2>
            <div className={styles.moves} ref={movesBox}> 
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
                            <p className={styles.moves_move} key={`${i} ${fromSquare} ${toSquare}`}>
                                <img className={styles.moves_move_piece} src={icons[piece]}/>
                                {castleling && ' - '}
                                {castleling && <img className={styles.moves_move_piece} src={icons[`${piece_color} rook`]}/>}
                                {pieceTaken && ` x `}
                                {pieceTaken && <img className={styles.moves_move_piece} src={icons[pieceTaken]}/>}
                                {`${toSquare}`}
                            </p>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default ShowMoves;