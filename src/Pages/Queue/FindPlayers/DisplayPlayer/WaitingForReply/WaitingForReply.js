import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {overlayVariant, dialogVariant} from './Variants';
import {useSelector, useDispatch} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';


function WaitingForReply({setWaiting, username}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const chess = useSelector(state => state.chess);
    const message = useSelector(state => state.webRTC.remoteMessage);
    const error = useSelector(state => state.webRTC.error);
    const clientUsername = useSelector(state => state.account.username);

    const handleCancel = async () => {
        setWaiting(false);        
        dispatch({type: 'SET_LOCAL_MESSAGE', payload: {message: {from: clientUsername, action: 'cancel', data: {decision: 'decline'}}} });
        cancelChallenge();
    }

    const cancelChallenge = () => {
        fetch('https://world-class-chess-server.com/cancel_challenge', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username})
        })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error.message));
    }

    useEffect(() => {
        if(!error) return;
        
        setWaiting(false);
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: error}});
        dispatch({type: 'REINITIATE_WEBRTC', payload: {initiate: true}});

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
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Player declined'}});          
            dispatch({type: 'REINITIATE_WEBRTC', payload: {initiate: true}});
            cancelChallenge();
        }
        else{
            fetch('https://world-class-chess-server.com/create_match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({chess, playerOne, playerTwo}),
            })
            .then(async (response) => {
                if(response.status === 200){
                    console.log('Match has been created');
                    return response.text();                    
                }
                else{
                    const message = await response.text();
                    throw new Error(message, {cause: 'could not create match'});
                }
            }) 
            .then((result) => {
                console.log('Received match ID: ', result);
                dispatch({type: 'SET_LOCAL_MESSAGE', payload: {message: {from: clientUsername, action: 'match', data: {matchId: result}}}})
                navigate(`/chessboard/${result}`); 
            })
            .catch((error) => {
                const message = error.message;
                const cause = error.cause;
                if(cause === 'could not create match'){
                    console.error('Internal Server error occurred in this endpoint /create_match', message);
                    dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Internal Server error has occurred, please try again later'}})
                }
                   
                else{
                    console.error('Server went offline in this endpoint /create_match ', message)
                    dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
                }      
                navigate('/menu');
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