import { connectionManager } from "../WebRtcReducer.js";

const createOffer = async (remoteClientUsername, {fullfillWithValue}) => {
    try{
        const peerConnection = connectionManager.peerConnection;
        const signalingServer = connectionManager.signalingServer;
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        console.log('local description created?')
        signalingServer.send(JSON.stringify({ 
            type: 'offer', 
            offer: {sdp: offer.sdp, type: offer.type}, 
            username: remoteClientUsername, 
        }))   
        return fullfillWithValue('Offer sent to remote client');       
    }
    catch(error){
        const message = error.message;
        return Promise.reject(message);
    }
}

export default createOffer;