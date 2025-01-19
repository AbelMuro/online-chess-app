import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

function Checkmate() {
    const blackKingInCheck = useSelector(state => state.chess.black_king_in_check);
    const whiteKingInCheck = useSelector(state => state.chess.white_king_in_check);

    useEffect(() => {
        console.log(blackKingInCheck)
        console.log(whiteKingInCheck)
    }, [blackKingInCheck, whiteKingInCheck])

    return(
        <>
        </>
    )
}

export default Checkmate;