import { connectionManager } from "../WebRtcReducer.js";

const createOffer = async (_, {fulfillWithValue, getState}) => {
    try{
        const {account, webRTC} = getState();
        const localClientUsername = account.username;
        const remoteClientUsername = webRTC.remoteClientUsername;

        const peerConnection = connectionManager.peerConnection;
        const signalingServer = connectionManager.signalingServer;
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        signalingServer.send(JSON.stringify({ 
            type: 'offer', 
            offer: {sdp: offer.sdp, type: offer.type}, 
            from: localClientUsername, 
            to: remoteClientUsername
        }))   
        return fulfillWithValue('Offer sent to remote client');       
    }
    catch(error){
        const message = error.message;
        return Promise.reject(message);
    }
}

export default createOffer;