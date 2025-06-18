import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import onmessage from './EventHandlers/signalingServer.js';
import onicecandidate from './EventHandlers/peerConnection.js';

function useWebRTC() {
    const signalingServer = useRef();
    const peerConnection = useRef();
    const dataChannel = useRef();
    const dispatch = useDispatch();
    const localMessage = useSelector(state => state.webRTC.localMessage);
    const localClientUsername = useSelector(state => state.account.username);
    const remoteClientUsername = useSelector(state => state.webRTC.remoteClientUsername);
    const reInitiateWebRTC = useSelector(state => state.webRTC.reInitiateWebRTC);
    const startConnection = useSelector(state => state.webRTC.startConnection);

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
            to: remoteClientUsername,
            from: localClientUsername
        }))
        console.log('Data channel has been created and offer has been sent');
    }

    useEffect(() => {
        return () => {
            dispatch({type: 'RESET_WEBRTC'});
        }
    }, [])


    useEffect(() => {
        if(!localMessage) return;

        if(dataChannel.current?.readyState === 'open'){
            dataChannel.current?.send(JSON.stringify(localMessage))
            console.log('Message has been sent')            
        }
    }, [localMessage])


    useEffect(() => {
        if(!remoteClientUsername || startConnection === null) return;

        connectToRemoteClient();
    }, [startConnection, remoteClientUsername])

    useEffect(() => {
        try{
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
            signalingServer.current.onmessage = onmessage(signalingServer.current, peerConnection.current);
            signalingServer.current.onopen = () => {console.log(`Connected to wss://world-class-chess-server.com:443/signal?username=${localClientUsername} websocket`)};
            peerConnection.current.onicecandidate = onicecandidate(signalingServer.current)
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
                    peerConnection.current.close();
                    signalingServer.current.close();      
                    dispatch({type: 'RESET_WEBRTC'});              
                    dispatch({type: 'REINITIATE_WEBRTC'})
                };
        
                dataChannel.current.onerror = (error) => {                                    
                    console.log('Data channel error: ', error);
                    dispatch({type: 'SET_ERROR', payload: {error}});
                }
            }

            console.log('WebRTC initiated');
        }
        catch(error){
            const message = error.message;
            console.error('Error occurred inside useWebRTC hook: ', message)
        }
        return () => {
            if(dataChannel.current)
                dataChannel.current.close();
        }

    }, [reInitiateWebRTC])

    return null
}

export default useWebRTC;