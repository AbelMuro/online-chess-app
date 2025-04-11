import {useState, useEffect} from 'react';

function useWebRTC(){
    const [sendMessage, setSendMessage] = useState();

    useEffect(() => {
        const signalingServer = new WebSocket('wss://world-class-chess-server.com:443/signal')
        const peerConnection = new RTCPeerConnection();
       
        const dataChannel = peerConnection.createDataChannel('chat');
        dataChannel = onopen = () => console.log('Data channel open');
        dataChannel = onmessage = () => console.log('Received: ', e.data);

        setSendMessage((message) => {
            if(dataChannel.readyState === 'open') 
                dataChannel.send(message);
        })

        signalingServer.onmessage = async (message) => {
            const data = JSON.parse(message.data);
        
            if (data.type === 'offer') {                                              //we handle a connection here (when a remote client wants to connect to a local client)
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));   //we create a remote description of the offer  (remote description are the connection settings of the OTHER peer)
                const answer = await peerConnection.createAnswer();                                 //we create an answer in response to the offer
                await peerConnection.setLocalDescription(answer);                                   //we create a local description of the answer we created
                signalingServer.send(JSON.stringify({ type: 'answer', answer }));                   //we send the answer to the websocket
            } 
            else if (data.type === 'answer') 
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));  //we create a remote description of the answer from another peer
            else if (data.type === 'candidate')
                await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        };
        
        // ICE Candidate handling       
        // (ICE candidate is a potent0ial network path that webRTC can use to connect two clients, the client collects all possible connections and uses the best one)
        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                signalingServer.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
            }
        };
        
        // Start connection
        const startConnection = async () => {
            const offer = await peerConnection.createOffer();                   //creating an offer object that contains information about the client's session, connection, etc..
            await peerConnection.setLocalDescription(offer);                    //we crete a local description of the offer (local description are connection settings for THIS peer)
            signalingServer.send(JSON.stringify({ type: 'offer', offer }));     //we send the offer to the websocket
        }

        startConnection();
    }, [])



    return [sendMessage];
}

export default useWebRTC;