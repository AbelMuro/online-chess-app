import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

function usePieceLogic({color}) {
    const currentTurn = useSelector(state => state.chess.current_turn);
    const board = useSelector(state => state.chess.board);

    const handleMouseEnter = useCallback((e) => {
        if(currentTurn === color){
            e.target.style.backgroundColor = 'rgb(0, 0, 255, 0.6)';
            e.target.style.cursor = 'pointer'
        }
           
    }, [currentTurn])

    const handleMouseLeave = useCallback((e) => {
        e.target.style.backgroundColor = '';
        e.target.style.cursor = ''
    }, [])



    return [board, handleMouseEnter, handleMouseLeave];
}

export default usePieceLogic;