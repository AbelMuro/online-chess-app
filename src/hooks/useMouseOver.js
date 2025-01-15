import {useSelector} from 'react-redux';

function useMouseOver({color}) {
    const currentTurn = useSelector(state => state.chess.current_turn);

    const handleMouseEnter = (e) => {
        if(currentTurn === color)
           e.target.style.backgroundColor = 'rgb(0, 0, 255, 0.6)';
    }

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = '';
    }

    const handleStyles = () => {
        if(currentTurn === color)
            return {cursor: 'pointer'}
        else
            return {};
    }

    return [handleMouseEnter, handleMouseLeave, handleStyles]

}

export default useMouseOver;