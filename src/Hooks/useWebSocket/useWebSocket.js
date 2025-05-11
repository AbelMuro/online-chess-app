import {useState, useEffect} from 'react';


function useWebSocket(url, callback, initialState) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        const socket = new WebSocket(url);            	

        socket.onopen = () => {                                        
            console.log(`Connected to ${url} websocket servers`);
        };
    
        socket.onmessage = callback;                        
    
        socket.onclose = () => {
            console.log(`Disconnected from ${url} websocket server`);
        };
    
        socket.onerror = (error) => {
            console.error(`Error occurred in websocket ${url}: `, error);
        };

        return () => {
            socket?.send?.('helll owolrld')
            socket?.close?.();
        }
    }, [])

    return [data, setData];
}

    
export default useWebSocket;