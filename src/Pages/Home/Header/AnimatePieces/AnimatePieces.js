import React from 'react';
import icons from './icons';
import * as styles from './styles.module.css';


function AnimatePieces({controls}) {
    return(
        <div className={styles.container}>
            <img className={styles.piece_piece}/>
            <img className={styles.piece_piece}/>
            <img className={styles.piece_piece}/>
        </div>
    )
}

export default AnimatePieces;