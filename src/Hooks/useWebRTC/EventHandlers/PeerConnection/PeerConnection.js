const onIceCandidate = (signalingServer) => {
    return (e) => {
        if(e.candidate) 
            signalingServer.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
        else
            console.log('All ICE candidates have been collected');
    };
}

const onIceConnectionStateChange = (peerConnection) => {
    return () => {
        const state = peerConnection.iceConnectionState;
        console.log(`ICE state: ${state}`)
    }
}

const onDataChannel = (setMessage, setConnection) => {
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
            setConnection('connected')
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
