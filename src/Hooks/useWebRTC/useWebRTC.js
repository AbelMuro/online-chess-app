import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

function useWebRTC(){
    const [sendMessageToClient, setSendMessageToClient] = useState();
    const [sendOfferToClient, setSendOfferToClient] = useState();
    const dispatch = useDispatch();
    const localClientUsername = sessionStorage.getItem('username');

    useEffect(() => {
        const signalingServer = new WebSocket('wss://world-class-chess-server.com:443/signal')
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { 
                    urls: 'turn:openrelay.metered.ca:80',
                    username: 'openrelayproject',
                    credential: 'openrelaypassword'
                }
            ]
        });
       
        const dataChannel = peerConnection.createDataChannel('chat');
        dataChannel.onopen = () => console.log('Data channel open');
        dataChannel.onmessage = (e) => console.log('Received: ', e.data);
 
        peerConnection.onicecandidate = event => {
            console.log('Ice Candidate: ', event.candidate);
            if(event.candidate) 
                signalingServer.send(JSON.stringify({type: 'candidate', candidate: event.candidate}));
        };   
        
        peerConnection.oniceconnectionstatechange = () => console.log(`ICE state: ${peerConnection.iceConnectionState}`);
        
        signalingServer.onmessage = async (message) => {
            try{
                const text = await message.data.text();
                const data = JSON.parse(text);
                console.log(data);
            
                if(data.type === 'offer') {                                                            //we handle a connection here (when a remote client wants to connect to a local client)
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));   //we create a remote description of the offer  (remote description are the connection settings of the OTHER peer)
                    const answer = await peerConnection.createAnswer();                                 //we create an answer in response to the offer
                    await peerConnection.setLocalDescription(answer);                                   //we create a local description of the answer we created
                    signalingServer.send(JSON.stringify({ type: 'answer', answer }));                   //we send the answer to the websocket
                } 
                else if(data.type === 'answer') 
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));  //we create a remote description of the answer from another peer
                else if(data.type === 'candidate')
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
            catch(error){
                const message = error.message;
                console.log(message);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Error trying to establish connection to remote client'}})
            }

        };

        signalingServer.onopen = async () => {
            console.log('Connected to signaling websocket');
        }        


        setSendMessageToClient(() => ({
            callback: (message) => {
                if(dataChannel.readyState === 'open') 
                    dataChannel.send(message);
            }  
        }))

        setSendOfferToClient(() => ({
            callback: async (remoteClientUsername) => {
                const offer = await peerConnection.createOffer();                       //creating an offer object that contains information about the client's session, connection, etc..
                await peerConnection.setLocalDescription(offer);                        //we crete a local description of the offer (local description are connection settings for THIS peer)
                signalingServer.send(JSON.stringify({ type: 'offer', offer: {sdp: offer.sdp, type: offer.type}, username: remoteClientUsername}));
            }
        }));
    }, [])



    return [sendMessageToClient, sendOfferToClient];
}

export default useWebRTC;