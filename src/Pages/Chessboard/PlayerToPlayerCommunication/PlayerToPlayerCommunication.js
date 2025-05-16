import {memo} from 'react';
import useWebSocket from '~/Hooks/useWebSocket/useWebSocket';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

function PlayerToPlayerCommunication({matchId}) {
    const localClientUsername = useSelector(state => state.account.username);
    const playerOne = useSelector(state => state.settings.player_one);
    const playerTwo = useSelector(state => state.settings.player_two);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const localClientColor = playerOne.username === localClientUsername ? playerOne.color: playerTwo.color;
    console.log('local client color = ', localClientColor);

    return;
    useWebSocket(`wss://world-class-chess-server.com:443/match?matchId=${matchId}player=${localClientUsername}color=${localClientColor}`, 
        (e) => {
            console.log('received message from match websocket')
            const state = JSON.parse(e.data);
            dispatch({type: 'UPDATE_STATE', payload: {state}})
        }, 
        []);
 
    return null;
}

export default memo(PlayerToPlayerCommunication);