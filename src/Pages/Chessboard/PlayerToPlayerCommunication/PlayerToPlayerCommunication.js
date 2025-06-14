import {memo, useEffect, useRef} from 'react';
import ConnectToWebsocket from '~/assets/functions/ConnectToWebSocket.js';
import {useSelector, useDispatch} from 'react-redux';


/* 
    i need to display a message to the user that their opponent left the match and they win by default
    the timer must end as well
*/

function PlayerToPlayerCommunication({matchId}) {
    const board = useSelector(state => state.chess.board)
    const localClientUsername = useSelector(state => state.account.username);
    const playerOne = useSelector(state => state.settings.player_one);
    const playerTwo = useSelector(state => state.settings.player_two);
    const renderedOnce = useRef(false);
    const dispatch = useDispatch();
    const skipFirstRender = useRef(true);

    useEffect(() => {
        if(skipFirstRender.current){
            skipFirstRender.current = false;
            return;
        }

        dispatch({type: 'RESET_TIMER', payload: {seconds: 60}});

    }, [board])

    useEffect(() => {
        console.log('initiating match web socket', playerOne, playerTwo, localClientUsername)
        if(!playerOne?.color || !playerTwo?.color || !playerOne?.username || !localClientUsername) return;
        if(renderedOnce.current) return;

        renderedOnce.current = true;

        const localClientColor = playerOne.username === localClientUsername ? playerOne.color: playerTwo.color;
        const closeWebsocket = ConnectToWebsocket(`wss://world-class-chess-server.com:443/match?matchId=${matchId}&username=${localClientUsername}&color=${localClientColor}`,         
            (e) => {
                const state = JSON.parse(e.data);
                if(state.matchDeleted){
                    dispatch({type: 'STOP_TIMER'});
                    dispatch({type: 'FORFEIT'});
                    return;
                }
                
                dispatch({type: 'UPDATE_STATE', payload: {state}})
            }
        )

        return () => {
            closeWebsocket();
        }

    }, [playerOne, playerTwo, localClientUsername])

    return null;
}

export default memo(PlayerToPlayerCommunication);