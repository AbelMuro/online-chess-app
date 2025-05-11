const onIceCandidate = (signalingServer) => {
    return (e) => {
        if(e.candidate) 
            signalingServer.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
        else
            console.log('All ICE candidates have been collected');
    };
}

const onIceConnectionStateChange = (peerConnection, dispatch) => {
    return () => {
        const state = peerConnection.iceConnectionState;
        console.log(`ICE state: ${state}`)
        if(state === 'disconnected' || state === 'failed' || state === 'closed')
            dispatch({type: 'SET_ERROR', payload: {error: state, message: 'Could not establish ICE connection'}});
    }
}


export {onIceCandidate, onIceConnectionStateChange};
