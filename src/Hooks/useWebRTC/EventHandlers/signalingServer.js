import Store from '~/Store';

export default function onmessage (signalingServer, peerConnection) {

    return async (message) => {
        const text = await message.data.text();
        const data = JSON.parse(text);
        const {from: to} = data;
        const {account: {username: from}} = Store.getState();

        if(data.type === 'offer' && peerConnection.signalingState === 'stable') {                
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));       
            const answer = await peerConnection.createAnswer();                                     
            await peerConnection.setLocalDescription(answer);       
            Store.dispatch({type: 'SET_REMOTE_CLIENT_USERNAME', payload: {username: to}})                                
            signalingServer.send(JSON.stringify({ type: 'answer', answer, to, from}));                      
        } 
        else if(data.type === 'answer' && peerConnection.signalingState === 'have-local-offer')
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));      
         
        else if(data.type === 'candidate' && peerConnection.signalingState !== 'closed')    
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate)); 
    }

}