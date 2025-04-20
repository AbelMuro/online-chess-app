const signalingServerOnMessage = (peerConnection, dispatch, signalingServer) => {

    return async (message) => {
        try{
            const text = await message.data.text();
            const data = JSON.parse(text);
            console.log(data.type);
        
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
    }
}

export {signalingServerOnMessage};
