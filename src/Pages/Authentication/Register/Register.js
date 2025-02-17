import React from 'react';
import {useNavigate} from 'react-router-dom';
import Form from './Form';
import * as styles from './styles.module.css';

function Register() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/')
    }

    return(
        <section className={styles.register}>
            <h1 className={styles.register_title}>
                Register
            </h1>
            <h2 className={styles.register_desc}>
                Password must have at least 1 number, 1 symbol, 1 letter and 8 characters
            </h2>   
            <Form/>
            <p className={styles.register_message}>
                Already have an account? &nbsp;
                <a className={styles.register_link} onClick={handleLogin}>
                    Click Here
                </a>
            </p>
        </section>
    )
}

export default Register;