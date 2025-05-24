import React from 'react';
import * as styles from './styles.module.css';


function DisplayPieces() {
    return(
        <div className={styles.container}>
            <img className={styles.piece_piece}/>
            <img className={styles.piece_piece}/>
            <img className={styles.piece_piece}/>
        </div>
    )
}

export default DisplayPieces;