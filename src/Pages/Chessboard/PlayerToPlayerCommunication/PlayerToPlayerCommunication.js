import {memo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

function PlayerToPlayerCommunication({matchId}) {
    const localClientUsername = useSelector(state => state.account.username);
    const message = useSelector(state => state.webRTC.message);
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    useEffect(() => {
        if(!message) return;
        if(message.from === localClientUsername) return;
        if(message.action !== 'move') return;

        dispatch(syncStateWithDatabase(matchId))
    }, [message])       
    
    return null;
}

export default memo(PlayerToPlayerCommunication);