import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

function Greeting(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.account.username);
    const imageURL = useSelector(state => state.account.imageURL);

    const getInfo = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.com/get_account', {
                method: 'GET',
                credentials: 'include'
            })

            if(response.status === 200){
                const account = await response.json();
                const username = account.username;
                const image = account.image;
                const contentType = account.contentType;

                if(image){
                    const url = convertBase64ToBlobURL(image, contentType);
                    dispatch({type: 'SET_ACCOUNT', payload: {username, imageURL: url}})
                }
                else
                    dispatch({type: 'SET_ACCOUNT', payload: {username, imageURL: ''}})
            }
            else if(response.status === 403){
                const message = await response.text();
                console.log(message);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Please enable third-party-cookies in your browser to use this app.'}})
                navigate('/')
            }
            else{
                const message = await response.text();
                console.log(message);
                dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            dispatch({type: 'DISPLAY_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
        }
    }

    useEffect(() => {
        getInfo();
    }, [])


    return(
        <section className={styles.container}>
            {imageURL && <img className={styles.photo} src={imageURL}/>}
            <h1 className={styles.title}>
                Hello {username}!
            </h1>
        </section>

    )
}

export default Greeting;