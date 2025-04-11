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
            if (dataChannel.readyState === 'open') {
                dataChannel.send(message);
            }
        })

        signalingServer.onmessage = async (message) => {
            const data = JSON.parse(message.data);
        
            if (data.type === 'offer') {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                signalingServer.send(JSON.stringify({ type: 'answer', answer }));
            } 
            else if (data.type === 'answer') 
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            else if (data.type === 'candidate')
                await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            
        };
        
        // ICE Candidate handling
        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                signalingServer.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
            }
        };
        
        // Start connection
        const startConnection = async () => {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            signalingServer.send(JSON.stringify({ type: 'offer', offer }));
        }

        startConnection();
    }, [])



    return [startConnection, sendMessage];
}

export default useWebRTC;