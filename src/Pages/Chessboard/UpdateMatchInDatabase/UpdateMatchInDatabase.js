import {memo, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { syncDatabaseWithState } from '!/chessReducer.js';


function UpdateMatchInDatabase({matchId}) {
    const skipFirstRender = useRef(true);
    const board = useSelector(state => state.chess.board);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(skipFirstRender.current){
            skipFirstRender.current = false;
            return;
        }

        dispatch(syncDatabaseWithState(matchId));
    }, [board])


    return null;
}

export default memo(UpdateMatchInDatabase);