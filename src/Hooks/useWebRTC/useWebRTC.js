import {useState, useEffect, useRef} from 'react';
import { signalingServerOnMessage, signalingServerOnOpen} from './EventHandlers/SignalingServer';
import { onIceCandidate, onIceConnectionStateChange, onDataChannel } from './EventHandlers/PeerConnection';
import { dataChannelOnOpen, dataChannelOnClose, dataChannelOnError, dataChannelOnMessage } from './EventHandlers/DataChannel';
import {useDispatch} from 'react-redux';

function useWebRTC(){  
    const [signalingServer, setSignalingServer] = useState();
    const [peerConnection, setPeerConnection] = useState();
    const [dataChannel, setDataChannel] = useState();
    const remoteClientUsername = useRef();
    const [message, setMessage] = useState();
    const [connected, setConnected] = useState('not initialized');
    const [localClient, setLocalClient] = useState();
    //const localClientUsername = sessionStorage.getItem('username');    
    const dispatch = useDispatch();

    const initializeConnection = (remoteUsername) => {
        const signalingServer = new WebSocket('wss://world-class-chess-server.com:443/signal');
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                {
                    urls: process.env.TURN_SERVER,
                    username: process.env.TURN_USERNAME,
                    credential: process.env.TURN_CREDENTIAL
                }
            ]
        });
        const dataChannel = peerConnection.createDataChannel('chat');
        remoteClientUsername.current = remoteUsername;
        setSignalingServer(signalingServer);
        setPeerConnection(peerConnection);
        setDataChannel(dataChannel);
    }

    const sendOfferToRemoteClient = async () => {
        try{
            const offer = await peerConnection.createOffer()
            await peerConnection.setLocalDescription(offer);
            signalingServer.send(JSON.stringify({ 
                type: 'offer', 
                offer: {sdp: offer.sdp, type: offer.type}, 
                username: remoteClientUsername.current, 
            }))            
        }
        catch(error){
            const message = error.message;
            console.log(message);
        }
    }

    const sendMessageToRemoteClient = (message) => {
        if(dataChannel?.readyState === 'open')
            dataChannel?.send(JSON.stringify(message));
    }
    
    const cancelConnection = () => {
        peerConnection?.close();
    }


    useEffect(() => {
        if(!signalingServer || !peerConnection || !dataChannel) return; 

        signalingServer.onmessage = signalingServerOnMessage(peerConnection, dispatch, signalingServer);         //returns a callback
        signalingServer.onopen = signalingServerOnOpen();
        peerConnection.onicecandidate = onIceCandidate(signalingServer)                                                  //returns a callback
        peerConnection.oniceconnectionstatechange = onIceConnectionStateChange(peerConnection, setConnected);
        peerConnection.ondatachannel = onDataChannel(setMessage);
        dataChannel.onopen = dataChannelOnOpen(peerConnection, setLocalClient);                //setLocalClient will be set within the dataChannelOnOpen() function
        dataChannel.onclose = dataChannelOnClose(setLocalClient);        
        dataChannel.onerror = dataChannelOnError();
        dataChannel.onmessage = dataChannelOnMessage();
        sendOfferToRemoteClient();

        return () => {
            signalingServer?.close();
            peerConnection?.close();
            dataChannel?.close();
        }
    }, [signalingServer, peerConnection, dataChannel])


    return [
        initializeConnection,
        sendMessageToRemoteClient,
        message,
        localClient, 
        cancelConnection,
        connected
    ];
}

export default useWebRTC;