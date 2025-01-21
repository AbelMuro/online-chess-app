import {useCallback} from 'react';
import {useSelector} from 'react-redux';

function usePieceLogic({color}) {
    const currentTurn = useSelector(state => state.chess.current_turn);
    const board = useSelector(state => state.chess.board);

    const handleMouseEnter = useCallback((e) => {
        if(currentTurn === color)
           e.target.style.backgroundColor = 'rgb(0, 0, 255, 0.6)';
    }, [currentTurn])

    const handleMouseLeave = useCallback((e) => {
        e.target.style.backgroundColor = '';
    }, [])

    const handleStyles = useCallback(() => {
        if(currentTurn === color)
            return {cursor: 'pointer'}
        else
            return {};
    }, [currentTurn])

    return [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles];
}

export default usePieceLogic;