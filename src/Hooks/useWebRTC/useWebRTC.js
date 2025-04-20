import {useState, useEffect, useRef} from 'react';
import { signalingServerOnMessage, signalingServerOnOpen} from './EventHandlers/SignalingServer';
import { onIceCandidate, onIceConnectionStateChange, onDataChannel } from './EventHandlers/PeerConnection';
import { dataChannelOnOpen, dataChannelOnClose, dataChannelOnError, dataChannelOnMessage } from './EventHandlers/DataChannel';
import {useDispatch} from 'react-redux';

function useWebRTC(){  
    const [peerConnection, setPeerConnection] = useState();
    const [dataChannel, setDataChannel] = useState();
    const signalingServer = useRef(new WebSocket('wss://world-class-chess-server.com:443/signal'));
    const remoteClientUsername = useRef();
    const [message, setMessage] = useState();
    const [connected, setConnected] = useState('not initialized');
    const [localClient, setLocalClient] = useState();
    //const localClientUsername = sessionStorage.getItem('username');    
    const dispatch = useDispatch();

    const initializeConnection = (remoteUsername) => {
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
        setPeerConnection(peerConnection);
        setDataChannel(dataChannel);
    }

    const cancelConnection = () => {
        peerConnection?.close();
        dataChannel?.close();
    }


    const sendOfferToRemoteClient = async () => {
        try{
            const offer = await peerConnection.createOffer()
            await peerConnection.setLocalDescription(offer);
            signalingServer.current.send(JSON.stringify({ 
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
    

    useEffect(() => {
        if(!peerConnection || !dataChannel) return; 

        signalingServer.current.onmessage = signalingServerOnMessage(peerConnection, dispatch, signalingServer.current);         //returns a callback
        signalingServer.current.onopen = signalingServerOnOpen();
        peerConnection.onicecandidate = onIceCandidate(signalingServer.current)                                                  //returns a callback
        peerConnection.oniceconnectionstatechange = onIceConnectionStateChange(peerConnection, setConnected);
        peerConnection.ondatachannel = onDataChannel(setMessage);
        dataChannel.onopen = dataChannelOnOpen(peerConnection, setLocalClient, sendOfferToRemoteClient);         
        dataChannel.onclose = dataChannelOnClose(setLocalClient);        
        dataChannel.onerror = dataChannelOnError();
        dataChannel.onmessage = dataChannelOnMessage();

    }, [peerConnection, dataChannel])

    useEffect(() => {
        return () => {
            signalingServer.current?.close();
            peerConnection?.close();
            dataChannel?.close();
        }
    }, [])


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