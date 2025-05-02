import { signalingServerOnMessage, signalingServerOnOpen} from './EventHandlers/SignalingServer';
import { onIceCandidate, onIceConnectionStateChange} from './EventHandlers/PeerConnection';

export const updateDatabaseWithState = async (matchId, {getState, dispatch}) => {
    try{
        const state = getState();
        const chess = state.chess;

        const response = await fetch(`https://world-class-chess-server.com/update_match/${matchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chess, matchId})
        })
        const message = await response.text();
        return Promise.resolve(message);
    }
    catch(error){
        const message = error.message;
        console.log(message);
        return Promise.reject(message);
    }
}

export const updateStateWithDatabase = async (matchId, {getState, dispatch}) => {
    try{
        const response = await fetch(`https://world-class-chess-server.com/get_match/${matchId}`, {
            method: 'GET'
        });

        if(response.status === 200){
            const chess = await response.json();
            return Promise.resolve({chess});
        }
        else{
            const message = await response.text();
            return Promise.reject(message);
        }
    }
    catch(error){
        const message = error.message;
        console.log(message);
        return Promise.reject(message);
    }
}

export const initiatePeerConnection = async(_, {getState, dispatch}) => {
    try{
        const signalingServer = new WebSocket('wss://world-class-chess-server.com:443/signal');
        const peerConnection = new RTCPeerConnection();

        signalingServer.onmessage = signalingServerOnMessage(peerConnection, dispatch, signalingServer);        
        signalingServer.onopen = signalingServerOnOpen();
        peerConnection.onicecandidate = onIceCandidate(signalingServer)                                                  //returns a callback
        peerConnection.oniceconnectionstatechange = onIceConnectionStateChange(peerConnection, dispatch);
        peerConnection.ondatachannel = (e) => {
            const receivedChannel = e.channel;

            receivedChannel.onmessage = (e) => {
                const data = JSON.parse(e.data);
                const message = data.message;
                dispatch({type: 'SET_MESSAGE', payload: {message}})
            }
            receivedChannel.onopen = () => {
                console.log("Remote data channel is open!");
            };
        
            receivedChannel.onclose = () => {
                console.log("Remote data channel closed");
            };
    
            receivedChannel.onerror = (error) => {
                dispatch({type: 'SET_ERROR', payload: {error}});
            }
        }

        return Promise.resolve({peerConnection, signalingServer}) 
    }
    catch(error){
        const message = error.message;
        console.log(message);
        return Promise.reject(message);
    }
}
