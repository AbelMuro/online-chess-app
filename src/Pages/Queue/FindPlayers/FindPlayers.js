import React, {useMemo, memo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import DisplayPlayer from './DisplayPlayer';
import useWebSocket from '~/Hooks/useWebSocket';
import * as styles from './styles.module.css';
import icons from '~/assets/icons'

function FindPlayers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [players, setPlayers] = useWebSocket(
        'wss://world-class-chess-server.com:443/queue', 
        (e) => {
            const documents = JSON.parse(e.data);             
            setPlayers(documents);            
        }, []);

    const putPlayerInQueue = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/put_player_in_queue', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: {},
                credentials: 'include'
            });

            if(response.status === 200){
                const result = await response.json();
                const message = result.message;
                console.log(message);
            }
            else if(response.status === 403){
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Please enable third-party cookies in your browser to use this app'}})
                navigate('/');
            }
            else if(response.status === 401){
                const result = await response.text();
                console.log(result);
            }
            else{
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
        }
    }

    const availablePlayers = useMemo(() => {
        const currentPlayers = [];

        for(let i = 0; i < players.length; i++){
            const currentPlayer = sessionStorage.getItem('username');
            if(!currentPlayer) {
                navigate('/menu')
                return;
            }
            if(players[i].player === currentPlayer) continue;

            const playerInQueue = players[i].player;
            const profileImageBase64 = players[i].profileImageBase64;
            const contentType = players[i].contentType;
            const url = profileImageBase64 ? convertBase64ToBlobURL(profileImageBase64, contentType) : icons['empty avatar'];

            currentPlayers.push(<DisplayPlayer username={playerInQueue} image={url}/>)                
        }

        return currentPlayers;

    }, [players])


    useEffect(() => {
        putPlayerInQueue();
    }, [])

    return (
        <>
            {availablePlayers.length === 0 && 
                <h2 className={styles.desc}>
                    Looking for other players
                </h2>}
            {availablePlayers.length === 0 ? <ClipLoader size={'35px'} color='#CECECE'/> : availablePlayers}        
        </>
    )

}

export default memo(FindPlayers);