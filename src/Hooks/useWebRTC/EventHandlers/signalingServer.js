export default function onmessage (signalingServer, peerConnection) {

    return async (message) => {
        console.log('signaling websocket has been called')
        const text = await message.data.text();
        const data = JSON.parse(text);

        if(data.type === 'offer' && peerConnection.signalingState === 'stable') {                
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));       
            const answer = await peerConnection.createAnswer();                                     
            await peerConnection.setLocalDescription(answer);                                       
            signalingServer.send(JSON.stringify({ type: 'answer', answer }));                      
        } 
        else if(data.type === 'answer' && peerConnection.signalingState === 'have-local-offer'){ 
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));      
        } 
            
        else if(data.type === 'candidate' && peerConnection.signalingState !== 'closed')    
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate)); 
    }

}