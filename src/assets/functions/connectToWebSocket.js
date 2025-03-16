const connectToWebSocket = (onmessageFunction) => {
    const socket = new WebSocket('wss://world-class-chess-server.netlify.app/ws');

    socket.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    socket.onmessage = onmessageFunction;  // Update your front-end application with the received change

    socket.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}


export default connectToWebSocket;