import React from 'react';
import {useNavigate} from 'react-router-dom';
import Form from './Form'
import * as styles from './styles.module.css';

//this is where i left off, i will need to implement the login-guest feature on the server with node.js

function Login() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    const handleGuest = () => {
        
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
                Sign in as guest
            </button>
        </section>
    )
}

export default Login;