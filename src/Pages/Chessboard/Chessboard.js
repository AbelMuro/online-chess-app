import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import Pieces from './Pieces';
import * as styles from './styles.module.css';

//this is where i left off, i started the legal moves for the pawns, i will need to finish that
//i also need to let the user cancel a move if they click on any illegal square

function Chessboard() {
    const board = useSelector(state => state.chess.board);

    const squares = useMemo(() => {
        const squares = [];
        for (let row = 7; row >= 0; row--) { 
            for (let column = 0; column <= 7; column++) { 
                const color = board[row][column].slice(0, 5);
                const piece = board[row][column].slice(6, board[row][column].length);

                squares.push( 
                    <Pieces piece={piece} color={color} row={row} column={column} key={`${row + 1} ${column + 1}`}/>
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
        </section>
    )
}

export default Chessboard;