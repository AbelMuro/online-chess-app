import {memo, useEffect, useRef} from 'react';
import {syncDatabaseWithState} from '!/ChessReducer'
import ConnectToWebsocket from '~/assets/functions/ConnectToWebsocket';
import {useSelector, useDispatch} from 'react-redux';

function PlayerToPlayerCommunication({matchId}) {
    const board = useSelector(state => state.chess.board)
    const localClientUsername = useSelector(state => state.account.username);
    const playerOne = useSelector(state => state.settings.player_one);
    const playerTwo = useSelector(state => state.settings.player_two);
    const dispatch = useDispatch();
    const skipFirstRender = useRef(true);

    useEffect(() => {
        if(skipFirstRender.current) {
            skipFirstRender.current = false;
            return;
        }

        const finalizeTurn = async () => {
            dispatch({type: 'RESET_TIMER', payload: {seconds: 60}});
            await dispatch(syncDatabaseWithState(matchId))
        }

        finalizeTurn();

    }, [board])

    useEffect(() => {
        if(!playerOne?.color || !playerTwo?.color || !playerOne?.username) return;

        const localClientColor = playerOne.username === localClientUsername ? playerOne.color: playerTwo.color;
        const closeSocket = ConnectToWebsocket(`wss://world-class-chess-server.com:443/match?matchId=${matchId}&color=${localClientColor}`,         
            (e) => {
                const state = JSON.parse(e.data);
                dispatch({type: 'UPDATE_STATE', payload: {state}})
            }
        )

        return () => {
            closeSocket();
        }

    }, [playerOne, playerTwo, localClientUsername])


    return null;
}

export default memo(PlayerToPlayerCommunication);