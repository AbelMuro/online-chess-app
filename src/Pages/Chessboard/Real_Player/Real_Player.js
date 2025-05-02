import {memo, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import useWebRTC from '~/Hooks/useLocalStorage';
import {useSelector, useDispatch} from 'react-redux';
import { syncDatabaseWithState } from '!/chessReducer.js';

function Real_Player({matchId}) {
    const skipFirstRender = useRef(true);
    const board = useSelector(state => state.chess.board);
    const navigate = useNavigate();
    const dispatch = useDispatch();




    /* 
        this is where we update the database with the new state
        and send a message to the remote client afterward

        useEffect(() => {
            if(skipFirstRender.current){
                skipFirstRender.current = false;
                return;
            }

            dispatch(syncDatabaseWithState(matchId));
        }, [board])    
    */


    /* 
        we receive a message from the remote client here
        and then we we update the state with the database

        useEffect(() => {
            if(matchId === 'ai') return;
            dispatch(syncStateWithDatabase(matchId))
        }, [matchId])    
    */



    return null;
}

export default memo(Real_Player);