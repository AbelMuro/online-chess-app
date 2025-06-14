import {memo, useEffect, useRef} from 'react';
import ConnectToWebsocket from '~/assets/functions/ConnectToWebsocket';
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
    const closeWebsocket = useRef(() => {})
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
        if(!playerOne?.color || !playerTwo?.color || !playerOne?.username) return;

        console.log('initiating the match web socket');

        const localClientColor = playerOne.username === localClientUsername ? playerOne.color: playerTwo.color;
        closeWebsocket.current = ConnectToWebsocket(`wss://world-class-chess-server.com:443/match?matchId=${matchId}&username=${localClientUsername}&color=${localClientColor}`,         
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

    }, [playerOne, playerTwo, localClientUsername])

    useEffect(() => {
        return () => {
            if(!closeWebsocket.current) return;
            closeWebsocket.current();
        }
    }, [])


    return null;
}

export default memo(PlayerToPlayerCommunication);