import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {overlayVariant, dialogVariant} from './Variants';
import {useSelector, useDispatch} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';
import { PeerToPeerConnection } from '`/Queue';
import useLocalStorage from '~/Hooks/useLocalStorage';

//local client

function WaitingForReply({setWaiting}) {
    const navigate = useNavigate();
    const chess = useSelector(state => state.chess);
    const message = useSelector(state => state.webRTC.message);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [clientUsername] = useLocalStorage('username');

    const handleCancel = async () => {
        setWaiting(false);        
        dispatch({type: 'SEND_MESSAGE', payload: {message: {from: clientUsername, action: 'cancel', data: {decision: 'decline'}}} })

        //cancelConnection();
    }

    useEffect(() => {
        if(connection !== 'disconnected') return;

        setWaiting(false);
        dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Player was disconnected'}});
    }, [connection])    

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
            //cancelConnection();
        }
        else{
            fetch('https://world-class-chess-server.com/create_match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({chess, playerOne, playerTwo})
            })
            .then((response) => {
                console.log('Match has been created');
                return response.text();
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
                    {loading ? <ClipLoader size='25px' color='#CECECE'/> : 'Cancel'}
                </button>
            </motion.dialog>
        </motion.div>

    )
}

export default WaitingForReply;