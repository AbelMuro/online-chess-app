import React, {useMemo, memo, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import DisplayPlayer from './DisplayPlayer';
import useWebSocket from '~/Hooks/useWebSocket';
import * as styles from './styles.module.css';
import icons from '~/assets/icons'

function FindPlayers() {
    const username = useSelector(state => state.account.username);
    const [players, setPlayers] = useWebSocket(
        `wss://world-class-chess-server.com:443/queue?username=${username}`, 
        (e) => {
            const documents = JSON.parse(e.data);
            const allPromises = [];
            
            for(let i = 0; i < documents.length; i++){
                const playerInQueue = documents[i].player;
                const promise = fetch(`https://world-class-chess-server.com/get_player_account/${playerInQueue}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                allPromises.push(promise);
            }
            const responses = Promise.all(allPromises);   
            responses.then((responses) => {
                const result = Promise.all(responses.map(result => result.json()))
                result.then(accounts => setPlayers(accounts))
                result.catch(error => console.log('error from calling result.json() in nested promise.all()', error.message))
            })
            responses.catch(error => console.log('error from one of the fetch requests made in endpoint /get_player_account', error.message))
        }, []);


    const availablePlayers = useMemo(() => {
        if(!players.length) return [];
        let currentPlayers = [];

        for(let player of players){
            console.log(player.username, username);
            if(player.username === username) continue;

            const profileImageBase64 = player.imageBase64;
            const username = player.username;
            const contentType = player.contentType;
            
            const url = profileImageBase64 ? convertBase64ToBlobURL(profileImageBase64, contentType) : icons['empty avatar'];

            currentPlayers.push(<DisplayPlayer username={username} image={url}/>)
        }

        return currentPlayers;

    }, [players])

    useEffect(() => {
        console.log('available players', availablePlayers)
    }, [availablePlayers])



    return (
        <>
            {(availablePlayers && availablePlayers.length === 0) && 
                <h2 className={styles.desc}>
                    Looking for other players
                </h2>}
            {(availablePlayers && availablePlayers.length === 0) ? <ClipLoader size={'35px'} color='#CECECE'/> : availablePlayers}        
        </>
    )

}

export default memo(FindPlayers);