import {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

/* 
    this is where i left off, the webRTC seems to be working, i need to double check my env variables in here and in netlify to see if they work
    now i need to test out the webRTC by sending messages between the clients
*/

function useWebRTC(){  
    const [receiveMessageFromRemoteClient, setReceiveMessageFromRemoteClient] = useState();
    const [localClient, setLocalClient] = useState();
    const dispatch = useDispatch();
    const localClientUsername = sessionStorage.getItem('username');
    const signalingServer = useRef();
    const peerConnection = useRef();
    const dataChannel = useRef();

    const sendOfferToRemoteClient = async (remoteClientUsername) => {
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
            dataChannel.current = peerConnection.createDataChannel('chat');

            const offer = await peerConnection.current.createOffer();                       //creating an offer object that contains information about the client's session, connection, etc..
            await peerConnection.current.setLocalDescription(offer);                        //we create a local description of the offer (local description are connection settings for THIS peer)
            signalingServer.current.send(JSON.stringify({ 
                type: 'offer', 
                offer: {sdp: offer.sdp, type: offer.type}, 
                username: remoteClientUsername, 
            }));
        }
    

    const sendMessageToRemoteClient = (message) => {
        if(dataChannel.current.readyState === 'open') 
            dataChannel.current.send(JSON.stringify(message));
    }  

    const cancelConnection = () => {
        dataChannel.current.close();
        peerConnection.current.close();
    }
    

    const onopenDataChannel = () => {
        console.log('Data channel open'); 
        setLocalClient(peerConnection.current?.localDescription?.type);
    };

    const oncloseDataChannel = () => {
        console.log('Data channel closed');
        setLocalClient(false);
    }

    const onerrorDataChannel = (error) => {
        console.log('Data Channel Error: ', error)
    }

    const onmessageFromRemoteClient = (e) => {
        console.log('Received from Remote client')
        setReceiveMessageFromRemoteClient(JSON.parse(e.data))
    };

    const onicecandidate = (e) => {
        if(e.candidate) 
            signalingServer.current.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
        else
            console.log('All ICE candidates have been collected');
    };

    const oniceconnectionstatechange = () => {
        console.log(`ICE state: ${peerConnection.current.iceConnectionState}`)
    };

    const onmessageFromWebSocket = async (message) => {
        try{
            const text = await message.data.text();
            const data = JSON.parse(text);
        
            if(data.type === 'offer' && peerConnection.current.signalingState === 'stable') {                                                            //we handle a connection here (when a remote client wants to connect to a local client)
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));   //we create a remote description of the offer  (remote description are the connection settings of the OTHER peer)
                const answer = await peerConnection.current.createAnswer();                                 //we create an answer in response to the offer
                await peerConnection.current.setLocalDescription(answer);                                   //we create a local description of the answer we created
                signalingServer.current.send(JSON.stringify({ type: 'answer', answer }));                   //we send the answer to the websocket
            } 
            else if(data.type === 'answer' && peerConnection.current.signalingState === 'have-local-offer') 
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));  //we create a remote description of the answer from another peer
            else if(data.type === 'candidate' && peerConnection.current.signalingState !== 'closed')
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Error trying to establish connection to remote client'}})
        }
    };

    const onopenWebSocket = () => {
        console.log('Connected to signaling websocket');
    } 

    useEffect(() => {
        dataChannel.onopen = onopenDataChannel;
        dataChannel.onclose = oncloseDataChannel;        
        dataChannel.onerror = onerrorDataChannel;
        dataChannel.onmessage = onmessageFromRemoteClient;
        peerConnection.onicecandidate = onicecandidate;
        peerConnection.oniceconnectionstatechange = oniceconnectionstatechange;
        signalingServer.onmessage = onmessageFromWebSocket;
        signalingServer.onopen = onopenWebSocket;      

        return () => {
            dataChannel.close();
            peerConnection.close();
            signalingServer.close();
        }
    }, [])



    return [sendMessageToRemoteClient, sendOfferToRemoteClient, receiveMessageFromRemoteClient, localClient, cancelConnection];
}

export default useWebRTC;