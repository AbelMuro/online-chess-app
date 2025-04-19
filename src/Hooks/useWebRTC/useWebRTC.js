import {useState, useEffect, useRef} from 'react';
import { signalingServerOnMessage, signalingServerOnOpen} from './EventHandlers/SignalingServer';
import { onIceCandidate, onIceConnectionStateChange, onDataChannel } from './EventHandlers/PeerConnection';
import { dataChannelOnOpen, dataChannelOnClose, dataChannelOnError, dataChannelOnMessage } from './EventHandlers/DataChannel';
import {useDispatch} from 'react-redux';

function useWebRTC(){  
    const signalingServer = useRef();
    const peerConnection = useRef();
    const dataChannel = useRef();
    const [receiveMessageFromRemoteClient, setReceiveMessageFromRemoteClient] = useState();
    const [receiveResponseFromRemoteClient, setReceiveResponseFromRemoteClient] = useState();
    const [localClient, setLocalClient] = useState();
    //const localClientUsername = sessionStorage.getItem('username');    
    const dispatch = useDispatch();

    const sendOfferToRemoteClient = async (remoteClientUsername) => {
        try{
            const offer = await peerConnection.current.createOffer()
            await peerConnection.current.setLocalDescription(offer);
            signalingServer.current.send(JSON.stringify({ 
                type: 'offer', 
                offer: {sdp: offer.sdp, type: offer.type}, 
                username: remoteClientUsername, 
            }))            
        }
        catch(error){
            const message = error.message;
            console.log(message);
        }
    }

    const sendMessageToRemoteClient = (message) => {
        if(dataChannel.current?.readyState === 'open')
            dataChannel.current?.send(JSON.stringify(message));
    }
    
    const cancelConnection = () => {
        dataChannel.current?.close();
        peerConnection.current?.close();
    }


    useEffect(() => {
        signalingServer.current = new WebSocket('wss://world-class-chess-server.com:443/signal');
        peerConnection.current = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                {
                    urls: process.env.TURN_SERVER,
                    username: process.env.TURN_USERNAME,
                    credential: process.env.TURN_CREDENTIAL
                }
            ]
        });
        dataChannel.current = peerConnection.current.createDataChannel('chat');
        signalingServer.current.onmessage = signalingServerOnMessage(peerConnection.current, dispatch, signalingServer.current);         //returns a callback
        signalingServer.current.onopen = signalingServerOnOpen();
        peerConnection.current.onicecandidate = onIceCandidate(signalingServer.current)                         //returns a callback
        peerConnection.current.oniceconnectionstatechange = onIceConnectionStateChange(peerConnection.current);
        peerConnection.current.ondatachannel = onDataChannel(setReceiveResponseFromRemoteClient, setReceiveMessageFromRemoteClient);
        dataChannel.current.onopen = dataChannelOnOpen(peerConnection.current);                         //setLocalClient will be set within the dataChannelOnOpen() function
        dataChannel.current.onclose = dataChannelOnClose(setLocalClient);        
        dataChannel.current.onerror = dataChannelOnError();
        dataChannel.current.onmessage = dataChannelOnMessage();

        return () => {
            signalingServer.current?.close();
            peerConnection.current?.close();
            dataChannel.current?.close();
        }
    }, [])


    return [
        sendOfferToRemoteClient,
        sendMessageToRemoteClient,
        receiveMessageFromRemoteClient,
        receiveResponseFromRemoteClient, 
        localClient, 
        cancelConnection
    ];
}

export default useWebRTC;