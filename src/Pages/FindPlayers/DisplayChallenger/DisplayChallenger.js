import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'; 
import ConnectToWebSocket from '~/assets/functions/ConnectToWebSocket.js'
import * as styles from './styles.module.css';

///when the challenge button is clicked, this will create a Challenge document that keeps track of whether the users have both agreed to the challenge
// Then a websocket will be created that keeps track of any updates to that document, the challenger will then be connected to that websocket

/* 
    This is where i left off, i need to implement the functionality for the 


    else if(result.decline){}


    dont forget to finish the functionality for the <MessagesFromChallengers/> (clicking on accept or decline should close the dialog)

    you may need to debug the app, when i navigate to previous page (menu component) i get the error that username is not defined
*/

const callbackForChallengeWebSocket = (navigate, dispatch, challengeId) => {

    return async function (e) {
        const result = JSON.parse(e.data);
        if(!result) return;
        const message = result.message;
        const matchId = result.matchId;

        try{
            if(message === 'initiate match'){
                console.log('initiate match')
                this.close();
                const response = await fetch(`https://world-class-chess-server.com/delete_challenge/${challengeId}`, {     //endpoint will delete Challenge document, destroy websocket server, and create match
                    method: 'DELETE',
                })

                if(response.status === 200){
                    const result = await response.text();
                    console.log(result)
                    navigate(`/chessboard/${matchId}`, {state: {matchId}});
                    dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Match has been created!'}});
                }
                else {
                    const result = await response.text();
                    console.log(result);
                    dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later'}});
                }
            }
                
            else if(message.includes('decline')){
                console.log('declined')
                // i need to create a fetch request that destroys the websocket server, deletes the Challenge document
                // and then sends a message to the challenger that the other player declined
            }
            
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later'}});
        }
    }
}

function DisplayChallenger({username, image}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChallenge = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/create_challenge', {     //we create the challenge websocket
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({playerToBeChallenged: username})
            });   
            
            if(response.status === 200){
                const result = await response.json();
                console.log(result.message);
                const _id = result.challengeId;
                ConnectToWebSocket(`wss://world-class-chess-server.com:443/${_id}`, callbackForChallengeWebSocket(navigate, dispatch, _id))
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Invite has been sent, please wait for their reply.'}})
            }
            else if(response.status === 401){
                const result = await response.text();
                console.log(result);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Player has already been challenged by someone else.'}})
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
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
        }
    }

    return(               
         <div className={styles.queue_player} key={username}>
            <img className={styles.queue_player_image} src={image}/>
            <h3>
                {username}
            </h3>
            <button onClick={handleChallenge} className={styles.queue_button}>
                Challenge
            </button>
        </div>
    )
}

export default DisplayChallenger;