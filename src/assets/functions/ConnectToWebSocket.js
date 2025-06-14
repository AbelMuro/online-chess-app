const ConnectToWebsocket = (url, onmessage) => {
    const socket = new WebSocket(url);            	

    socket.onopen = () => {                                        
        console.log(`Connected to ${url} websocket server`);
    };

    socket.onmessage = onmessage;                        

    socket.onclose = () => {
        console.log(`Disconnected from ${url} websocket server`);
    };

    socket.onerror = (error) => {
        console.error(`Error occurred in websocket ${url}: `, error);
    };

    return socket.close();
}

export default ConnectToWebsocket;