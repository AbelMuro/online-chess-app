const onIceCandidate = (signalingServer) => {
    return (e) => {
        if(e.candidate) 
            signalingServer.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
        else
            console.log('All ICE candidates have been collected');
    };
}

const onIceConnectionStateChange = (peerConnection, setConnected) => {
    return () => {
        const state = peerConnection.iceConnectionState;
        console.log(`ICE state: ${state}`)
        

        if(state === 'disconnected' || state === 'failed' || state === 'closed')
            setConnected('disconnected')
        else if(state === 'connected')
            setConnected('connected')
    }
}

const onDataChannel = (setMessage) => {
    return (e) => {
        const receivedChannel = e.channel;

        receivedChannel.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log('Received message from remote client ', data);
            const message = data.message;
            setMessage(message);
        }
        receivedChannel.onopen = () => {
            console.log("Remote data channel is open!");
        };
    
        receivedChannel.onclose = () => {
            console.log("Remote data channel closed");
        };

        receivedChannel.onerror = (error) => {
            console.log('Remote data channel error: ', error);
        }
    }
}


export {onIceCandidate, onIceConnectionStateChange, onDataChannel};
