import {useRef, useEffect} from 'react';
import stockfish from 'stockfish';

//this is where i left off, i will need to figure out how to integrate stockfish AI into this app

function StockfishEngine({fen, onMove}) {
    const engine = useRef(null);

    useEffect(() => {
        engine.current = stockfish();

        engine.current.onmessage = (e) => {
            if(e.data.startsWith('bestmove')){
                const bestMove = e.data.split(' ')[1];
                onMove(bestMove);
            }
        }

        return () => {
            engine.current.terminate();    
        }

    }, [onMove])

    useEffect(() => {
        if(engine.current){
            engine.current.postMessage('uci');
            engine.current.postMessage(`position fen ${fen}`);
            engine.current.postMessage('go');
        }
    }, [fen])

    return null;
}

export default StockfishEngine;