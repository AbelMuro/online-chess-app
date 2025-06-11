import { signalingServerOnMessage, signalingServerOnOpen} from './EventHandlers/SignalingServer';
import { onIceCandidate, onIceConnectionStateChange} from './EventHandlers/PeerConnection';

const initiatePeerConnection = (_, {dispatch, fulfillWithValue, getState}) => {
    try{
        const {account} = getState();
        const localClientUsername = account.username;

        const signalingServer = new WebSocket(`wss://world-class-chess-server.com:443/signal?username=${localClientUsername}`);
        const peerConnection = new RTCPeerConnection();

        signalingServer.onmessage = signalingServerOnMessage(peerConnection, dispatch, signalingServer, getState);        
        signalingServer.onopen = signalingServerOnOpen();
        peerConnection.onicecandidate = onIceCandidate(signalingServer, getState)                                                  //returns a callback
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
                dispatch({type: 'SET_CONNECTED', payload: {connected: true}})
            };
        
            receivedChannel.onclose = () => {
                console.log('remote channel was closed');
                dispatch({type: 'CLOSE_DATA_CHANNEL'})
            };
    
            receivedChannel.onerror = (error) => {
                console.log('remote data channel error')
                dispatch({type: 'SET_ERROR', payload: {error, message: 'Remote data channel experienced an error'}});
            }
        }

        return fulfillWithValue({peerConnection, signalingServer})
    }
    catch(error){
        const message = error.message;
        return Promise.reject({message});
    }
}

export default initiatePeerConnection;