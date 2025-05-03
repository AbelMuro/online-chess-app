const createOffer = async (remoteClientUsername, {getState, fullfillWithValue, rejectWithValue}) => {
    try{
        const state = getState();

        const offer = await state.peerConnection.createOffer()
        await state.peerConnection.setLocalDescription(offer);
        state.signalingServer.send(JSON.stringify({ 
            type: 'offer', 
            offer: {sdp: offer.sdp, type: offer.type}, 
            username: remoteClientUsername, 
        }))   
        return fullfillWithValue('Offer sent to remote client');       
    }
    catch(error){
        const message = error.message;
        return rejectWithValue({message});
    }
}

export default createOffer;