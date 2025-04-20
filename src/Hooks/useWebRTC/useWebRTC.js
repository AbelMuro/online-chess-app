import {useState, useEffect, useRef} from 'react';
import { signalingServerOnMessage, signalingServerOnOpen} from './EventHandlers/SignalingServer';
import { onIceCandidate, onIceConnectionStateChange, onDataChannel } from './EventHandlers/PeerConnection';
import { dataChannelOnClose, dataChannelOnError, dataChannelOnMessage } from './EventHandlers/DataChannel';
import {useDispatch} from 'react-redux';

function useWebRTC(){  
    const signalingServer = useRef();
    const peerConnection = useRef();
    const [dataChannel, setDataChannel] = useState();
    const [message, setMessage] = useState();
    const [connected, setConnected] = useState('not initialized');
    const [localClient, setLocalClient] = useState();
    //const localClientUsername = sessionStorage.getItem('username');    
    const dispatch = useDispatch();

    const createConnection = () => {
        const dataChannel = peerConnection.current.createDataChannel('chat');
        setDataChannel(dataChannel);
    }

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
        setDataChannel(null);
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
        
        signalingServer.current.onmessage = signalingServerOnMessage(peerConnection.current, dispatch, signalingServer.current);         //returns a callback
        signalingServer.current.onopen = signalingServerOnOpen();
        peerConnection.current.onicecandidate = onIceCandidate(signalingServer.current)                                                  //returns a callback
        peerConnection.current.oniceconnectionstatechange = onIceConnectionStateChange(peerConnection.current, setConnected);
        peerConnection.current.ondatachannel = onDataChannel(setMessage);

        return () => {
            signalingServer.current?.close();
            peerConnection.current?.close();
        }
    }, [])

    useEffect(() => {
        if(!dataChannel) return;

        dataChannel.onopen = () => {
            console.log('Local channel is open');
            setLocalClient(peerConnection.current?.localDescription?.type)
            sendOfferToRemoteClient();
        }
        dataChannel.onclose = dataChannelOnClose(setLocalClient);        
        dataChannel.onerror = dataChannelOnError();
        dataChannel.onmessage = dataChannelOnMessage();

        return () => {
            dataChannel.close();
        }
    }, [dataChannel])


    return [
        createConnection,
        sendMessageToRemoteClient,
        message,
        localClient, 
        cancelConnection,
        connected
    ];
}

export default useWebRTC;