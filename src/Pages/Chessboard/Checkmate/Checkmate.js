import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

function Checkmate() {
    const checkmate = useSelector(state => state.chess.checkmate);

    useEffect(() => {
        if(checkmate)
            alert(`${checkmate} wins!`);
    }, [checkmate])

    return(
        <>
        </>
    )
}

export default Checkmate;