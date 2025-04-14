import {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

/* 
    this is where i left off, the webRTC seems to be working, i need to double check my env variables in here and in netlify to see if they work
    now i need to test out the webRTC by sending messages between the clients
*/

function useWebRTC(){  
    const [peerConnection, setPeerConnection] = useState();
    const [dataChannel, setDataChannel] = useState();
    const [receiveMessageFromRemoteClient, setReceiveMessageFromRemoteClient] = useState();
    const [remoteClientUsername, setRemoteClientUsername] = useState();    
    const localClientUsername = sessionStorage.getItem('username');    
    const [localClient, setLocalClient] = useState();
    const [signalingServer, setSignalingServer] = useState();
    const dispatch = useDispatch();

    const sendOfferToRemoteClient = async (remoteClientUsername) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                {
                    urls: process.env.TURN_SERVER,
                    username: process.env.TURN_USERNAME,
                    credential: process.env.TURN_CREDENTIAL
                }
            ]
        })
        const dataChannel = peerConnection.createDataChannel('chat');
        setPeerConnection(peerConnection);
        setDataChannel(dataChannel);     
        setRemoteClientUsername(remoteClientUsername);   
    }
    

    const sendMessageToRemoteClient = (message) => {
        if(dataChannel.readyState === 'open') 
            dataChannel.send(JSON.stringify(message));
    }  

    const cancelConnection = () => {
        dataChannel.close();
        peerConnection.close();
    }  

    const onopenDataChannel = () => {
        console.log('Data channel open'); 
        setLocalClient(peerConnection?.localDescription?.type);
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
            signalingServer.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
        else
            console.log('All ICE candidates have been collected');
    };

    const oniceconnectionstatechange = () => {
        console.log(`ICE state: ${peerConnection.iceConnectionState}`)
    };

    const onmessageFromWebSocket = async (message) => {
        try{
            const text = await message.data.text();
            const data = JSON.parse(text);
        
            if(data.type === 'offer' && peerConnection.signalingState === 'stable') {                                                            //we handle a connection here (when a remote client wants to connect to a local client)
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));   //we create a remote description of the offer  (remote description are the connection settings of the OTHER peer)
                const answer = await peerConnection.createAnswer();                                 //we create an answer in response to the offer
                await peerConnection.setLocalDescription(answer);                                   //we create a local description of the answer we created
                signalingServer.send(JSON.stringify({ type: 'answer', answer }));                   //we send the answer to the websocket
            } 
            else if(data.type === 'answer' && peerConnection.signalingState === 'have-local-offer') 
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));  //we create a remote description of the answer from another peer
            else if(data.type === 'candidate' && peerConnection.signalingState !== 'closed')
                await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
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
        if(!peerConnection || !dataChannel) return;

        peerConnection.onicecandidate = onicecandidate;
        peerConnection.oniceconnectionstatechange = oniceconnectionstatechange; 
        dataChannel.onopen = onopenDataChannel;
        dataChannel.onclose = oncloseDataChannel;        
        dataChannel.onerror = onerrorDataChannel;
        dataChannel.onmessage = onmessageFromRemoteClient;
        
        peerConnection.createOffer()
            .then(offer => {
                peerConnection.setLocalDescription(offer)
                return Promise.resolve(offer)
            })
            .then((offer) => {
                signalingServer.send(JSON.stringify({ 
                    type: 'offer', 
                    offer: {sdp: offer.sdp, type: offer.type}, 
                    username: remoteClientUsername, 
                }))
            });

        return () => {
            peerConnection.close();
            dataChannel.close();
        }
                
    }, [peerConnection, dataChannel])

    useEffect(() => {
        const signalingServer = new WebSocket('wss://world-class-chess-server.com:443/signal');
        signalingServer.onmessage = onmessageFromWebSocket;
        signalingServer.onopen = onopenWebSocket;  

        setSignalingServer(signalingServer);

        return () => {
            signalingServer.close();
        }
    }, [])


    return [sendMessageToRemoteClient, sendOfferToRemoteClient, receiveMessageFromRemoteClient, localClient, cancelConnection];
}

export default useWebRTC;