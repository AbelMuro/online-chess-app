import React from 'react';
import Form from './Form';
import * as styles from './styles.module.css';

function Register() {
    return(
        <section className={styles.register}>
            <h1 className={styles.register_title}>
                Register
            </h1>
            <h2 className={styles.register_desc}>
                Password must have at least 1 number, 1 symbol, 1 letter and 8 characters
            </h2>   
            <Form/>
        </section>
    )
}

export default Register;