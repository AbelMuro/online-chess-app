const onIceCandidate = (signalingServer) => {
    return (e) => {
        if(e.candidate) 
            signalingServer.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
        else
            console.log('All ICE candidates have been collected');
    };
}

const onIceConnectionStateChange = (peerConnection) => {
    return () => console.log(`ICE state: ${peerConnection.iceConnectionState}`)
}

const onDataChannel = (setReceiveResponseFromRemoteClient, setReceiveMessageFromRemoteClient, setConnected) => {
    return (e) => {
        const receivedChannel = e.channel;

        receivedChannel.onmessage = (e) => {
            console.log('Received message from remote client ', e.data);
            const data = JSON.parse(e.data);

            if(data.decision)
                setReceiveResponseFromRemoteClient(data);           //local client
            else
                setReceiveMessageFromRemoteClient(data);            //remote client
        }
        receivedChannel.onopen = () => {
            console.log("Remote data channel is open!");
            setConnected(true);
        };
    
        receivedChannel.onclose = () => {
            console.log("Remote data channel closed");
            setConnected(false);
        };
    }
}


export {onIceCandidate, onIceConnectionStateChange, onDataChannel};
