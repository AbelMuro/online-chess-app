const createOffer = async (remoteClientUsername, {getState}) => {
    try{
        const state = getState();

        const offer = await state.peerConnection.createOffer()
        await state.peerConnection.setLocalDescription(offer);
        state.signalingServer.send(JSON.stringify({ 
            type: 'offer', 
            offer: {sdp: offer.sdp, type: offer.type}, 
            username: remoteClientUsername, 
        }))   
        return Promise.resolve('Offer sent to remote client')         
    }
    catch(error){
        const message = error.message;
        return Promise.reject(message);
    }
}

export default createOffer;