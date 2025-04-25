import {useState, useEffect, useRef} from 'react';
import { signalingServerOnMessage, signalingServerOnOpen} from './EventHandlers/SignalingServer';
import { onIceCandidate, onIceConnectionStateChange, onDataChannel } from './EventHandlers/PeerConnection';
import { dataChannelOnOpen, dataChannelOnClose, dataChannelOnError, dataChannelOnMessage } from './EventHandlers/DataChannel';
import {useDispatch} from 'react-redux';


//this is where i left off, i need to find a way to close both remote and local data channels of the clients and reconnect again
// only the local client should create a dataChannel() , the remote client should rely on ondatachannel() to gain access to the same channel as the local client
//i sort of applied the logic above, i need to test everything out
//also, update notes on WebRTC.js in github

function useWebRTC(){  
    const signalingServer = useRef();
    const peerConnection = useRef();
    const dataChannel = useRef();
    const [message, setMessage] = useState();
    const [connection, setConnection] = useState(false);
    const [dataChannelOpen, setDataChannelOpen] = useState(false);
    const localClientUsername = sessionStorage.getItem('username');    
    const dispatch = useDispatch();

    const sendOfferToRemoteClient = async (remoteClientUsername) => {
        try{
            dataChannel.current = peerConnection.current.createDataChannel('chat');             //event handlers for client
            dataChannel.current.onopen = dataChannelOnOpen(setDataChannelOpen);
            dataChannel.current.onclose = dataChannelOnClose(setDataChannelOpen);  
            dataChannel.current.onerror = dataChannelOnError();
            dataChannel.current.onmessage = dataChannelOnMessage(setMessage);  

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
        if(!peerConnection.current) {
            console.log('peer connection not initialized');
            return;
        };
        dataChannel.current?.close();  
        setMessage(null);                           //removing any lingering past messages from the previous channel
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

        // peerConnection.current?.localDescription?.type            this will return either offer or answer     
        signalingServer.current.onmessage = signalingServerOnMessage(peerConnection.current, dispatch, signalingServer.current);         //returns a callback
        signalingServer.current.onopen = signalingServerOnOpen();
        peerConnection.current.onicecandidate = onIceCandidate(signalingServer.current)                                                  //returns a callback
        peerConnection.current.oniceconnectionstatechange = onIceConnectionStateChange(peerConnection.current, setConnection);
        peerConnection.current.ondatachannel = (e) => {
            const receivedChannel = e.channel;
            dataChannel.current = receivedChannel;

            receivedChannel.onmessage = (e) => {
                const data = JSON.parse(e.data);
                console.log('Received message from remote client ', data);              //event handlers for remote client
                const message = data.message;
                setMessage(message);
            }
            receivedChannel.onopen = () => {
                console.log("Remote data channel is open!");
            };
        
            receivedChannel.onclose = () => {
                console.log("Remote data channel closed");
            };
    
            receivedChannel.onerror = (error) => {
                console.log('Remote data channel error: ', error);
            }
        }

        return () => {
            signalingServer.current?.close();
            peerConnection.current?.close();
        }
    }, [])

    return [
        sendOfferToRemoteClient,
        sendMessageToRemoteClient,
        message,
        cancelConnection,
        connected,
        dataChannelOpen
    ];
}

export default useWebRTC;