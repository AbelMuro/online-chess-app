import {useState, useEffect} from 'react';


function useWebSocket(url, callback) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(url);            	

        socket.onopen = () => {                                        
            console.log('Connected to WebSocket server');
        };
    
        socket.onmessage = callback;                        
    
        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
    
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket?.close?.();
        }
    }, [])

    return [data, setData];
}

    
export default useWebSocket;