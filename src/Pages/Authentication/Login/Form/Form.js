import React from 'react';
import EnterEmail from '~/assets/Components/EnterEmail';
import EnterPassword from '~/assets/Components/EnterPassword';
import * as styles from './styles.module.css';

//this is where i left off, i will need to set up a server with node.js and a database with mondoDB, and send the login credentials to the server

function Form() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        console.log(email, password);
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterEmail/>
            <EnterPassword/>
            <button className={styles.form_submit}>
                Sign in
            </button>
        </form>
    )
}

export default Form;