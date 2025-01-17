import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import * as styles from './styles.module.css';

function CheckMessage() {
    const blackKingInCheck = useSelector(state => state.chess.black_king_in_check);
    const whiteKingInCheck = useSelector(state => state.chess.white_king_in_check);
    const illegalMovesForBlackKing = useSelector(state => state.illegal_moves_for_black_king);
    const illegalMovesForWhiteKing = useSelector(state => state.illegal_moves_for_white_king);
    const currentTurn = useSelector(state => state.current_turn);

    useEffect(() => {



    }, [currentTurn, illegalMovesForBlackKing, illegalMovesForWhiteKing])

    return(
        <>

        </>
    )
}

export default CheckMessage;