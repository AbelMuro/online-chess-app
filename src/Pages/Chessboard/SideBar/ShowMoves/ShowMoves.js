import React, {useEffect, useRef} from 'react';
import {squareCoordinates} from './SquareCoordinates';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';
import icons from '~/assets/icons';

function ShowMoves() {
    const moves = useSelector(state => state.chess.moves);
    const movesBox = useRef();


    return(
        <section className={styles.container}>
            <h2>
                Moves
            </h2>
            <div className={styles.moves} ref={movesBox}> 
                {
                    moves.map((move) => {
                        const from = move.from;
                        const to = move.to;
                        const pieceToBeMoved = move.pieceToBeMoved;
                        let piece = pieceToBeMoved.slice(0, pieceToBeMoved.length - 2);
                        const pieceToBeTaken = move.pieceToBeTaken;

                        const fromSquare = squareCoordinates[from.row][from.column];
                        const toSquare = squareCoordinates[to.row][to.column];

                        return(
                            <p className={styles.moves_move} key={`${fromSquare} ${toSquare}`}>
                                <img className={styles.moves_move_piece} src={icons[piece]}/>
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