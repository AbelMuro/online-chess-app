import React, {useRef, useMemo} from 'react';
import { board_variants, square_variants } from './Variants';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css'

function AnimateChessboard({controls}) {

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
        <motion.section className={styles.board}>
            {
                allSquares.map((square, i) => {
                    return (
                        <motion.div 
                            className={square === 'lightSquare' ? styles.light_square : styles.dark_square} 
                            key={`${square} ${i}`}>
                        </motion.div>
                    )
                })
            }
        </motion.section>
    )
}

export default AnimateChessboard;