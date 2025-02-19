import React from 'react';
import Form from './Form';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';

//this is where i left off, i will need to implement the forgot password feature here, first work on the css, then create a route in node.js that handles all forgot password functionality
//then i can start integrating AI into the app

function ForgotPassword() {
    const navigate = useNavigate();

    const handleLink = () => {
        
    }

    return(
        <section className={styles.forgot}>
            <h1 className={styles.forgot_title}>
                Enter your email
            </h1>
            <h2 className={styles.forgot_desc}>
                We will send you an link that you can use to reset your password
            </h2>
            <Form/>
        </section>
    )
}

export default ForgotPassword;