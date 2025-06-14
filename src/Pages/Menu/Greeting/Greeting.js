import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import convertBase64ToBlobURL from '~/Common/Functions/convertBase64ToBlobURL.js';
import {useNavigate} from 'react-router-dom';
import icons from '~/assets/icons';
import * as styles from './styles.module.css';

function Greeting(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.account.username);
    const [imageURL, setImageURL] = useState();

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
                let url = '';

                if(image)
                    url = convertBase64ToBlobURL(image, contentType);

                dispatch({type: 'SET_ACCOUNT', payload: {username}})
                setImageURL(url);
            }
            else if(response.status === 403){
                const message = await response.text();
                console.log(message);
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Please enable third-party-cookies in your browser to use this app.'}})
                navigate('/')
            }
            else{
                const message = await response.text();
                console.error('Internal Server error has occurred in this endpoint /get_account ', message);
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
            }
        }
        catch(error){
            const message = error.message;
            console.error('Server went offline in this endpoint /get_account ', message);
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
        }
    }

    useEffect(() => {
        getInfo();
    }, [])


    return(
        <section className={styles.container}>
            {imageURL ? <img className={styles.photo} src={imageURL}/> : <img className={styles.photo} src={icons['empty avatar']}/>}
            <h1 className={styles.title}>
                Hello {username}!
            </h1>
        </section>

    )
}

export default Greeting;