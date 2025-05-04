import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {overlayVariant, dialogVariant} from './Variants';
import {useSelector, useDispatch} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

//local client


/* 
    this is where i left off, i finished refactoring the webRTC reducer,
    now i need to navigate both clients to the chessboard and i need to make sure 
    the connection with WebRTC remains active so that the clients can continue sending
    messages to each other everytime they make a move
*/

function WaitingForReply({setWaiting}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const chess = useSelector(state => state.chess);
    const message = useSelector(state => state.webRTC.message);
    const error = useSelector(state => state.webRTC.error);
    const clientUsername = useSelector(state => state.account.username);

    const handleCancel = async () => {
        setWaiting(false);        
        dispatch({type: 'SEND_MESSAGE', payload: {message: {from: clientUsername, action: 'cancel', data: {decision: 'decline'}}} });
        dispatch({type: 'CANCEL_CONNECTION'})
    }

    useEffect(() => {
        if(!error) return;
        
        console.log(error);
        setWaiting(false);
        dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Player was disconnected'}});
        dispatch({type: 'CANCEL_CONNECTION'})
    }, [error])      

    useEffect(() => {
        if(!message) return;
        if(message.from === clientUsername) return;
        if(message.action !== 'decision') return;

        const playerOne = clientUsername;
        const playerTwo = message.from;
        const data = message.data;
        const decision = data.decision;

        if(decision === 'decline'){
            setWaiting(false);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Player declined'}});
            dispatch({type: 'CANCEL_CONNECTION'});
        }
        else{
            fetch('https://world-class-chess-server.com/create_match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({chess, playerOne, playerTwo})
            })
            .then(async (response) => {
                if(response.status === 200){
                    console.log('Match has been created');
                    return response.text();                    
                }
                else{
                    const message = await response.text();
                    throw new Error(`Internal Server Error has occured: ${message}`);
                }
            }) 
            .then((result) => {
                console.log('Received match ID: ', result);
                dispatch({type: 'SEND_MESSAGE', payload: {message: {from: clientUsername, action: 'match', data: {matchId: result}}}})
                navigate(`/chessboard/${result}`);
            })
            .catch((error) => {
                const message = error.message;
                console.log(message);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
            })
        }
    }, [message])

    return(
        <motion.div className={styles.overlay} initial='hidden' animate='show' exit='exit' variants={overlayVariant}>
            <motion.dialog open={true} className={styles.container} initial='hidden' animate='show' exit='exit' variants={dialogVariant}>
                <h2 className={styles.title}>
                    {`Waiting for their reply..`}
                </h2>
                <ClipLoader size='30px' color='#CECECE'/>
                <button className={styles.cancel} onClick={handleCancel}>
                    Cancel
                </button>
            </motion.dialog>
        </motion.div>
    )
}

export default WaitingForReply;