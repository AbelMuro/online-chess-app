import {memo, useEffect} from 'react';
import useWebSocket from '~/Hooks/useWebSocket/useWebSocket';
import {useSelector, useDispatch} from 'react-redux';

function PlayerToPlayerCommunication({matchId}) {
    const localClientUsername = useSelector(state => state.account.username);
    const playerOne = useSelector(state => state.settings.player_one);
    const playerTwo = useSelector(state => state.settings.player_two);
    const dispatch = useDispatch();
    const localClientColor = playerOne.username === localClientUsername ? playerOne.color: playerTwo.color;

    useWebSocket(`wss://world-class-chess-server.com:443/match?matchId=${matchId}&player=${localClientUsername}&color=${localClientColor}`, 
        (e) => {
            const state = JSON.parse(e.data);
            dispatch({type: 'UPDATE_STATE', payload: {state}})
        }, 
        []);

    useEffect(() => {
        if(localClientUsername !== playerOne.username) return;

        setTimeout(() => {
            dispatch({type: 'CANCEL_CONNECTION'})                   //canceling any lingering webRTC connections
        }, 2000)   
    }, [playerOne, localClientUsername])
 
    return null;
}

export default memo(PlayerToPlayerCommunication);