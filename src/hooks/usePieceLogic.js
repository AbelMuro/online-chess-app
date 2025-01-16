import {useSelector} from 'react-redux';
import useMouseOver from './useMouseOver.js';

function usePieceLogic({color}) {
    const board = useSelector(state => state.chess.board);
    const currentTurn = useSelector(state => state.chess.current_turn);
    const [handleMouseEnter, handleMouseLeave, handleStyles] = useMouseOver({color});

    return [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles];
}

export default usePieceLogic;