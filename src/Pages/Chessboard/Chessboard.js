import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import Squares from './Squares';
import CheckMessage from './CheckMessage';
import Checkmate from './Checkmate';
import * as styles from './styles.module.css';

function Chessboard() {
    const board = useSelector(state => state.chess.board);

    const squares = useMemo(() => {
        const squares = [];
        for (let row = 7; row >= 0; row--) { 
            for (let column = 0; column <= 7; column++) { 
                const color = board[row][column].slice(0, 5);
                const piece = board[row][column].slice(6, board[row][column].length);

                squares.push( 
                    <Squares piece={piece} color={color} row={row} column={column} key={`${row + 1} ${column + 1}`}/>
                ); 
            }        
        }
        return squares;
    }, [board])


    return(
        <section className={styles.chess}> 
            <div className={styles.chess_board}>
                {squares}
            </div>
            <CheckMessage/>
            <Checkmate/>
        </section>
    )
}

export default Chessboard;