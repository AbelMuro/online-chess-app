import React, {useRef, useMemo} from 'react';
import { board_variants, square_variants, column_variants, row_variants, text_variants} from './Variants';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css'


//i need to create a mapping between the board array and the squares array


function AnimateChessboard({controls}) {
    const columnNumbers = useRef([8, 7, 6, 5, 4, 3, 2, 1]);
    const rowLetters = useRef(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    const board = useRef([
        ['black rook', 'black knight', 'black bishop', 'black queen', 'black king', 'black bishop', 'black knight', 'black rook'],
        ['black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn'],      
        ['', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '',],
        ['white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn'],
        ['white rook', 'white knight', 'white bishop', 'white queen', 'white king', 'white bishop', 'white knight', 'white rook'], 
    ]);
    const row = useRef(1);
    const column = useRef(1);

    const allSquares = useMemo(() => {
        const squares = []
        for (let row = 0; row <= 7; row++) { 
            const alternate = row % 2 === 0
            for (let column = 0; column <= 7; column++) { 
                let square;

                if(alternate)
                    square = column % 2 === 0 ? 'lightSquare' : 'darkSquare';
                else
                    square = column % 2 !== 0 ? 'lightSquare' : 'darkSquare';

                squares.push(square)     
            }        
        }

        return squares;
    }, [])

    return(
        <motion.section 
            className={styles.board} 
            initial='hidden'
            animate={controls}
            variants={board_variants}>
                <motion.aside className={styles.top_row} variants={row_variants}>
                    {rowLetters.current.map((letter) => {
                        return <motion.span variants={text_variants}>{letter}</motion.span>
                    })}
                </motion.aside>
                <motion.aside className={styles.left_column} variants={column_variants}>
                    {columnNumbers.current.map((number) => {
                        return <motion.span variants={text_variants}>{number}</motion.span>
                    })}
                </motion.aside>
                <motion.aside className={styles.right_column} variants={column_variants}>
                    {columnNumbers.current.map((number) => {
                        return <motion.span variants={text_variants}>{number}</motion.span>
                    })}
                </motion.aside>
                <motion.aside className={styles.bottom_row} variants={row_variants}>
                    {rowLetters.current.map((letter) => {
                        return <motion.span variants={text_variants}>{letter}</motion.span>
                    })}
                </motion.aside>
                    {
                        allSquares.map((square, i) => {
                            column.current = (i + 1) / 8 > column.current ? column.current + 1 : column.current;
                            row.current = column.current / 8 > row.current ? row.current + 1 : row.current;
                            console.log(column, row.current);

                            return (
                                <motion.div 
                                    className={square === 'lightSquare' ? styles.light_square : styles.dark_square} 
                                    variants={square_variants}
                                    key={`${square} ${i}`}>
                                </motion.div>
                            )
                        })
                    }
        </motion.section>
    )
}

export default AnimateChessboard;