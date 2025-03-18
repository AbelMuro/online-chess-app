import React, {useState} from 'react';
import {ClipLoader} from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import Form from './Form'
import * as styles from './styles.module.css';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        navigate('/register');
    }

    const handleGuest = async () => {
        setLoading(true);
        try{
            const response = await fetch('https://world-class-chess-server-hcp9qz4vq-abelmuros-projects.vercel.app/guestlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: '',
                credentials: 'include'
            });
            if(response.status === 200){
                console.log('User has been logged in as guest');
                navigate('/menu');
            }
        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
        finally{
            setLoading && setLoading(false);
        }
    }

    const handleForgot = () => {
        navigate('/forgotpassword');
    }

    return(
        <section className={styles.login}>
            <h1 className={styles.login_title}>
                Welcome to World Class Chess
            </h1>
            <h2 className={styles.login_desc}>
                Please sign in with your account or as a guest
            </h2>
            <Form/>
            <a className={styles.login_link} onClick={handleForgot}>
                Forgot password?
            </a>
            <p className={styles.login_message}>
                 Don't have an account? &nbsp;
                <a className={styles.login_link} onClick={handleRegister}>
                    Register here
                </a>                
            </p>
            <button className={styles.login_button} onClick={handleGuest}>
                {loading ? <ClipLoader size='30px' color='#0000A1'/> : 'Sign in as guest'}
            </button>
        </section>
    )
}

export default Login;