import React from "react";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js'
import icons from '~/assets/icons';
import useWebSocket from "~/Hooks/useWebSocket/useWebSocket";
import * as styles from './styles.module.css';
import ConnectToWebSocket from '~/assets/functions/ConnectToWebSocket.js'
//i need to connect the challenged player to the websocket on the back end
//most likely i will need to use the userWebSocket hook in this component to do that

function MessagesFromChallengers(){
    const board = useSelector(state => state.chess.board);
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    if(!username) {
        navigate('/menu');
        return null;
    } 
    const [challenger, setChallenger] = useWebSocket(
        `wss://world-class-chess-server.com:443/${username}`, 
        (e) => {
            const challenger = JSON.parse(e.data);
            const challengeId = challenger.challengeId;
            setChallenger(challenger);
            ConnectToWebSocket(`wss://world-class-chess-server.com:443/${challengeId}`, (e) => {
                const result = JSON.parse(e.data);

                if(result === 'initiate match'){
                    console.log('initiate match')
                }
                    //i may need to create a fetch request to create a match and navigate to the chessboard
                else if(result.decline){
                    console.log('declined')
                    //i need to create a fetch request that destroys the websocket server and sends a message to THIS player that the other player declined
                }
            })
        }, null)

    const handleAccept = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/accept_invitation', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({challenger: challenger.username, challengedPlayer: username, board})
            })

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
            }
            else{
                const result = await response.text();
                console.log(result);
                alert('Internal Server Error has occurred, please try again later');
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
    }

    const handleDecline = () => {

    }


/* 
    const handleCreateMatch = async () => {
        const matchId = Array.from({length: 10}, () => null).reduce((acc) => {acc += Math.floor(Math.random() * 9); return acc}, '');

        try{
            const response = await fetch('https://world-class-chess-server.com/create_match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({board, matchId})
            })

            if(response.status === 200){
                const result = await response.text();
                console.log(result);
                navigate(`/chessboard/${matchId}`);
            }

            else{
                const result = await response.text();
                console.log(result)
                alert('Internal Server Error, please try again later')
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert(message);
        }
    }

*/

    const loadImage = () => {
        if(challenger.imageBase64)
            return convertBase64ToBlobURL(challenger.imageBase64, challenger.imageContentType);
        else
            return icons['empty avatar'];
    }

    return challenger && (
        <div className={styles.overlay}>
            <dialog className={styles.dialog} open={true}>
                <h1>
                    {`You have been challenged by: `}
                </h1>
                <div className={styles.display_challenger}>
                    <img src={loadImage()}/>
                    <h2>
                        {challenger.username}
                    </h2>
                </div>    
                <button onClick={handleAccept}>
                    Accept
                </button>     
                <button onClick={handleDecline}>
                    Decline
                </button>          
            </dialog>
        </div>
    )
}

export default MessagesFromChallengers;