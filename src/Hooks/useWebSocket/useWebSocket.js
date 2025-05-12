import {useState, useEffect} from 'react';


function useWebSocket(url, onmessage, initialState) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
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

        return () => {
            socket?.close?.();
        }
    }, [])

    return [data, setData];
}

    
export default useWebSocket;