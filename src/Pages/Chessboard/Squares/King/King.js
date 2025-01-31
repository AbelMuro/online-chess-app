import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {usePieceLogic} from '~/hooks';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function King({color, row, column}) {
    const [board, currentTurn, handleMouseEnter, handleMouseLeave, handleStyles] = usePieceLogic({color});
    const dispatch = useDispatch();
    const kingInCheck = useSelector(state => {
        return color === 'white' ? state.chess.white_king_in_check : state.chess.black_king_in_check;
    })

    const handleCheck = () => {
        return {
            backgroundColor: 'rgba(0, 0, 230, 0.6)'
        }
    }


    const kingMoveRules = () => {
        dispatch({type: 'HIGHLIGHT_KING_SQUARES', payload: {square: {row, column, color}}})
    }


    const handleClick = () => {
        dispatch({type: 'PIECE_TO_BE_MOVED', payload: {square: {row, column}}});
        dispatch({type: 'REMOVE_ALL_HIGHLIGHTED_SQUARES'});
        kingMoveRules();
    }


    useEffect(() => {
        dispatch({type: 'IS_KING_IN_CHECK', payload: {square: {row, column, color}}})
    }, [board])

    return (
        <div             
            className={styles.container} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={currentTurn === color ? handleClick : () => {}}
            style={kingInCheck ? handleCheck() : handleStyles()}>
                <img className={styles.piece} src={icons[`${color}King`]}/>
        </div>
    )
}

export default King;