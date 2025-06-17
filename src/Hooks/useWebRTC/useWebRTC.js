import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import onmessage from './EventHandlers/signalingServer.js';

function useWebRTC() {
    const signalingServer = useRef();
    const peerConnection = useRef();
    const dataChannel = useRef();
    const dispatch = useDispatch();
    const localMessage = useSelector(state => state.webRTC.localMessage);
    const localClientUsername = useSelector(state => state.account.username);
    const remoteClientUsername = useSelector(state => state.webRTC.remoteClientUsername);
    const reInitiateWebRTC = useSelector(state => state.webRTC.reInitiateWebRTC);

    const connectToRemoteClient = async () => {
        dataChannel.current = peerConnection.current.createDataChannel('chat');
        dataChannel.current.onopen = () => {
            console.log('Data channel is open');
            dispatch({type: 'CONNECTION_ESTABLISHED', payload: {connection: true}})
        };
        dataChannel.current.onclose = () => {
            console.log('Data channel is closed');
            dispatch({type: 'CONNECTION_ESTABLISHED', payload: {connection: false}})            
            peerConnection.current.close();
            signalingServer.current.close();
        };
        dataChannel.current.onerror = (error) => {
            console.log(`Data channel error: ${error}`);
            dispatch({type: 'SET_ERROR', payload: {error}});
        };
        dataChannel.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log('Received message from remote client: ', data);
            dispatch({type: 'SET_REMOTE_MESSAGE', payload: {message: data}})
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        signalingServer.current.send(JSON.stringify({
            type: 'offer',
            offer: {sdp: offer.sdp, type: offer.type},
            username: remoteClientUsername
        }))
    }


    useEffect(() => {
        if(!localMessage || !dataChannel.current) return;
        dataChannel.current?.send(JSON.stringify(localMessage))
    }, [localMessage])


    useEffect(() => {
        if(!remoteClientUsername) return;

        connectToRemoteClient();
    }, [remoteClientUsername])

    useEffect(() => {
        if(signalingServer.current) signalingServer.current.close();
        if(peerConnection.current) peerConnection.current.close();

        signalingServer.current = new WebSocket(`wss://world-class-chess-server.com:443/signal?username=${localClientUsername}`);
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
        signalingServer.current.onmessage = onmessage;
        signalingServer.current.onopen = () => {console.log('Connected to signaling websocket')};
        peerConnection.current.onicecandidate = (e) => {
            if(e.candidate) 
                signalingServer.current.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
            else
                console.log('All ICE candidates have been collected');
        };
        peerConnection.current.oniceconnectionstatechange = () => {
            console.log(`ICE state: ${peerConnection.current.iceConnectionState}`);
        };
        peerConnection.current.ondatachannel = (e) => {
            dataChannel.current = e.channel;

            dataChannel.current.onmessage = (e) => {                                                          
                const data = JSON.parse(e.data);
                console.log('Received message from remote client ', data);    
                dispatch({type: 'SET_REMOTE_MESSAGE', payload: {message: data}})          
            }
            dataChannel.current.onopen = () => {
                console.log("Data channel is open!");
                dispatch({type: 'CONNECTION_ESTABLISHED', payload: {connection: true}})
            };
        
            dataChannel.current.onclose = () => {
                console.log("Data channel closed");
                dispatch({type: 'CONNECTION_ESTABLISHED', payload: {connection: false}});
                peerConnection.current.close();
                signalingServer.current.close();
            };
    
            dataChannel.current.onerror = (error) => {                                    
                console.log('Data channel error: ', error);
                dispatch({type: 'SET_ERROR', payload: {error}});
            }
        }

        return () => {
            dataChannel.current?.close();
        }

    }, [reInitiateWebRTC])

    return null
}

export default useWebRTC;