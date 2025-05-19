import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { ClipLoader } from 'react-spinners';
import EnterEmail from '~/assets/Components/EnterEmail';
import EnterPassword from '~/assets/Components/EnterPassword';
import * as styles from './styles.module.css';

function Form() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        setError('');
        setLoading(true);

        try{
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                credentials: 'include'
            })       
            
            if(response.status === 200){
                console.log('User successfully logged in');
                navigate('/menu');
            }
            
            else if(response.status === 401)
                setError('Email or password is incorrect');
            
            else{
                const message = await response.text();
                console.error('Internal Server error occurred in this endpoint /login', message);
                dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Internal Server Error has occurred, please try again later.'}})
                
            }
                
        }
        catch(error){
            const message = error.message;
            console.error('Server went offline in this endpoint /login', message);
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later.'}})
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterEmail/>
            <EnterPassword/>
            {error && <p className={styles.error_message}>{error}</p>}
            <button className={styles.form_submit}>
                {loading ? <ClipLoader size='30px' color='rgb(206, 206, 206)'/> : 'Sign in'}
            </button>
        </form>
    )
}

export default Form;