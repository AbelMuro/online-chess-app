import {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';


function useWebRTC(){  
    const [receiveMessageFromRemoteClient, setReceiveMessageFromRemoteClient] = useState();
    const [receiveResponseFromRemoteClient, setReceiveResponseFromRemoteClient] = useState();
    const [sendMessageToRemoteClient, setSendMessageToRemoteClient] = useState();
    const [sendOfferToRemoteClient, setSendOfferToRemoteClient] = useState();
    const [cancelConnection, setCancelConnection] = useState();
    const localClientUsername = sessionStorage.getItem('username');    
    const [localClient, setLocalClient] = useState();
    const dispatch = useDispatch();


    useEffect(() => {
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
        })
        const dataChannel = peerConnection.createDataChannel('chat');
        
        signalingServer.onmessage = async (message) => {
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
        signalingServer.onopen = () => {
            console.log('Connected to signaling websocket');
        } ;  
        peerConnection.onicecandidate = (e) => {
            if(e.candidate) 
                signalingServer.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
            else
                console.log('All ICE candidates have been collected');
        };
        peerConnection.oniceconnectionstatechange = () => {
            console.log(`ICE state: ${peerConnection.iceConnectionState}`)
        };

        peerConnection.ondatachannel = (e) => {                 //remote client
            const receivedChannel = e.channel;

            receivedChannel.onmessage = (e) => {
                console.log('Received message from remote client')
                const data = JSON.parse(e.data);
                
                if(data.decision)
                    setReceiveResponseFromRemoteClient(data);
                else 
                    setReceiveMessageFromRemoteClient(data);
            }
            receivedChannel.onopen = () => {
                console.log("Remote data channel is open!");
            };
        
            receivedChannel.onclose = () => {
                console.log("Remote data channel closed");
            };
        };

        dataChannel.onopen = () => {
            console.log('Local data channel open'); 
            setLocalClient(peerConnection?.localDescription?.type);
        };
        dataChannel.onclose = () => {
            console.log('Local data channel closed');
            setLocalClient(false);
        };        
        dataChannel.onerror = (error) => {
            console.log('Local data channel error: ', error)
        };
        dataChannel.onmessage = (e) => {
            console.log('Local data channel message ', e.data);
        }

        setSendOfferToRemoteClient(() => {
            return async (remoteClientUsername) => {
                const offer = await peerConnection.createOffer()
                peerConnection.setLocalDescription(offer);
                signalingServer.send(JSON.stringify({ 
                    type: 'offer', 
                    offer: {sdp: offer.sdp, type: offer.type}, 
                    username: remoteClientUsername, 
                }))
            }
        })

        setSendMessageToRemoteClient(() => {
            return (message) => {
                if(dataChannel.readyState === 'open')
                    dataChannel.send(JSON.stringify(message));
            }
        })

        setCancelConnection(() => {
            return () => {
                dataChannel.close();
                peerConnection.close();
            }
        })

        return () => {
            signalingServer.close();
            peerConnection.close();
            dataChannel.close();
        }
    }, [])


    return [receiveResponseFromRemoteClient, sendMessageToRemoteClient, sendOfferToRemoteClient, receiveMessageFromRemoteClient, localClient, cancelConnection];
}

export default useWebRTC;