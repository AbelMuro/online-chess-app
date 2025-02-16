import React from 'react';
import {useNavigate} from 'react-router-dom';
import Form from './Form'
import * as styles from './styles.module.css';

function Login() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
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
            <p className={styles.form_message}>
                 Don't have an account? &nbsp;
                <a className={styles.form_link} onClick={handleRegister}>
                    Register here
                </a>                
            </p>
            <button className={styles.form_button}>
                Sign in as guest
            </button>
        </section>
    )
}

export default Login;