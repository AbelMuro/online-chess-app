import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import EnterEmail from '~/Common/Components/EnterEmail';
import { ClipLoader } from 'react-spinners';
import * as styles from './styles.module.css';

function Form() {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        setError('');
        setLoading(true);

        try{
            const response = await fetch('https://world-class-chess-server.com/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email
                })
            })       
            
            if(response.status === 200){
                console.log('Link has been sent');
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Email has been sent'}})
            }
            
            else if(response.status === 401)
                setError("Email doesnt't exist");
            
            else{
                const message = await response.text();
                console.error(`Internal Server Error from endpoint /forgotpassword`, message);
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
                
            }
                
        }
        catch(error){
            const message = error.message;
            console.error('Server went offline in endpoint /forgotpassword', message)
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    return(        
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterEmail/>
            {error && <p className={styles.error_message}>{error}</p>}
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='rgb(206, 206, 206)'/> : 'Send Link'}
            </button>
        </form>
    )
}

export default Form;