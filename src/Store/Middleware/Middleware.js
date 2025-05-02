import { signalingServerOnMessage, signalingServerOnOpen} from './EventHandlers/SignalingServer';
import { onIceCandidate, onIceConnectionStateChange} from './EventHandlers/PeerConnection';

export const updateDatabaseWithState = async (matchId, {getState, dispatch}) => {
    try{
        const chess = getState();

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
                dispatch({type: 'SET_DATA_CHANNEL', payload: {dataChannel: receivedChannel}})
            };
        
            receivedChannel.onclose = () => {
                dispatch({type: 'CLOSE_DATA_CHANNEL'})
            };
    
            receivedChannel.onerror = (error) => {
                console.log('Remote data channel experienced an error ', error);
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


export const createDataChannel = async (_,{getState, dispatch, fulfillWithValue}) => {
    try{
        const state = getState();

        const dataChannel = state.peerConnection.createDataChannel('chat');            
        dataChannel.onopen = async () => {
            fulfillWithValue({dataChannel});    
        };
        dataChannel.onclose = () => {
            dispatch({type: 'CLOSE_DATA_CHANNEL'})
        };  
        dataChannel.onerror = (error) => {
            console.log('Local data channel experienced an error ', error);
            dispatch({type: 'SET_ERROR', payload: {error}});
        };
        dataChannel.onmessage = (e) => {
            console.log('Received message from remote client', e.data)
            const data = JSON.parse(e.data);
            const message = data.message;
            dispatch({type: 'SET_MESSAGE', payload: {message}})
        };        
    }
    catch(error){
        const message = error.message;
        return Promise.reject(message);
    }
}

export const createOffer = async (remoteClientUsername, {getState}) => {
    try{
        const state = getState();

        const offer = await state.peerConnection.createOffer()
        await state.peerConnection.setLocalDescription(offer);
        state.signalingServer.send(JSON.stringify({ 
            type: 'offer', 
            offer: {sdp: offer.sdp, type: offer.type}, 
            username: remoteClientUsername, 
        }))   
        return Promise.resolve('Offer sent to remote client')         
    }
    catch(error){
        const message = error.message;
        return Promise.reject(message);
    }
}