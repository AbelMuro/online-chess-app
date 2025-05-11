import {useState, useEffect, useRef} from 'react';


function useWebSocket(url, callback, initialState, dataToRemove) {
    const [data, setData] = useState(initialState);
    const socketRef = useRef();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        socketRef.current = new WebSocket(url);            	

        socketRef.current.onopen = () => {                                        
            console.log(`Connected to ${url} websocket servers`);
            setReady(true);
        };
    
        socketRef.current.onmessage = callback;                        
    
        socketRef.current.onclose = () => {
            console.log(`Disconnected from ${url} websocket server`);
        };
    
        socketRef.current.onerror = (error) => {
            console.error(`Error occurred in websocket ${url}: `, error);
        };

        return () => {
            socketRef.current?.close?.();
        }
    }, [])

    useEffect(() => {
        if(!ready) return;

        socketRef.current.send(dataToRemove);
    }, [ready])

    return [data, setData];
}

    
export default useWebSocket;