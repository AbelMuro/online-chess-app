import React from 'react';
import ConnectToWebSocket from '~/assets/functions/ConnectToWebSocket.js'
import * as styles from './styles.module.css';

///when the challenge button is clicked, this will create a Challenge document that keeps track of whether the users have both agreed to the challenge
// Then a websocket will be created that keeps track of any updates to that document, the challenger will then be connected to that websocket

/* 
    This is where i left off, i need to implement the functionality for the 

    if(result === 'initiate match'){}

    else if(result.decline){}

    and i also want to create dialogs for all the messages that i receive from the back-end

    dont forget to finish the functionality for the <MessagesFromChallengers/> (clicking on accept or decline should close the dialog)

*/

function DisplayChallenger({username, image}) {

    const handleChallenge = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/create_challenge', {
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
                ConnectToWebSocket(`wss://world-class-chess-server.com:443/${_id}`, (e) => {
                    const result = JSON.parse(e.data);

                    if(result === 'initiate match'){
                        console.log('initiate match')
                        //i may need to create a fetch request to create a match, destroy the websocket server, and delete the Challenge document
                        //then we can navigate the challenger to the chessboard
                    }
                        
                    else if(result.decline){
                        console.log('declined')
                        // i need to create a fetch request that destroys the websocket server, deletes the Challenge document
                        // and then sends a message to the challenger that the other player declined
                    }
                })
                alert('Invite has been sent, please wait for their reply');
            }
            else if(response.status === 401){
                const result = await response.text();
                console.log(result);
                alert('Player has already been challenged by someone else');
            }
            else{
                const result = await response.text();
                console.log(result);
                alert('Internal server error has occurred, please try again later');
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
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