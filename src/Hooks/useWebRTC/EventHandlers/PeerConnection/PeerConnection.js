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
            const data = JSON.parse(e.data);
            console.log('Received message from remote client ', data);

            setReceiveMessageFromRemoteClient(data);
            /*
            if(data.decision)
                setReceiveResponseFromRemoteClient(data);           //local client
            else
                setReceiveMessageFromRemoteClient(data);            //remote client
            */
        }
        receivedChannel.onopen = () => {
            console.log("Remote data channel is open!");
            setConnected('connected');
        };
    
        receivedChannel.onclose = () => {
            console.log("Remote data channel closed");
            setConnected('disconnected');
        };
    }
}


export {onIceCandidate, onIceConnectionStateChange, onDataChannel};
