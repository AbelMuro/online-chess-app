import Store from '~/Store'

export default function onicecandidate (signalingServer) {
    const remoteClientUsername = Store.getState().webRTC.remoteClientUsername;
    const localClientUsername = Store.getState().account.username;

    return (e) => {
        if(e.candidate) 
            signalingServer.send(JSON.stringify({type: 'candidate', candidate: e.candidate, to: remoteClientUsername, from: localClientUsername}));
        else
            console.log('All ICE candidates have been collected');
    }
}
