import React from 'react';
import {useSelector} from 'react-redux';
import icons from '~/assets/icons'
import * as styles from './styles.module.css';

function PiecesTaken() {
    const blackPiecesTaken = useSelector(state => state.chess.black_pieces_taken);
    const whitePiecesTaken = useSelector(state => state.chess.white_pieces_taken);


    return (blackPiecesTaken.length > 0 || whitePiecesTaken.length > 0) && 
        <section className={styles.pieces}>
            <div className={styles.pieces_white}>
                {
                    whitePiecesTaken.map((piece) => {
                        const pieceImage = piece.split(' ')[1];
                        console.log(pieceImage);
                        return (
                            <img src={icons[`white ${pieceImage}`]} key={piece}/>
                        )
                    })
                }
            </div>
            <div className={styles.pieces_black}>
                {
                    blackPiecesTaken.map((piece) => {
                        const pieceImage = piece.split(' ')[1];
                        return (
                            <img src={icons[`black ${pieceImage}`]} key={piece}/>
                        )
                    })
                }
            </div>
        </section>
}

export default PiecesTaken;