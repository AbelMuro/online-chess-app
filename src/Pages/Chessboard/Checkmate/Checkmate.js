import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

function Checkmate() {
    const checkmate = useSelector(state => state.chess.checkmate);
    const whiteKingInCheck = useSelector(state => state.chess.white_king_in_check);

    useEffect(() => {
        if(checkmate)
            alert(`${whiteKingInCheck ? 'Black' : 'White'} wins!`);
    }, [checkmate, whiteKingInCheck])

    return(
        <>
        </>
    )
}

export default Checkmate;