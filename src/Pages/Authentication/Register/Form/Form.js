import React from 'react';
import EnterEmail from '~/assets/Components/EnterEmail';
import RegisterPassword from '~/assets/Components/RegisterPassword';
import * as styles from './styles.module.css';

function Form(){

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements['register password'].value;
        const reEnterPassword = e.target.elements.password.value;

        if(password !== reEnterPassword) return;
        
        console.log(email, password, reEnterPassword);
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterEmail/>
            <RegisterPassword/>
            <button className={styles.form_submit}>
                Register
            </button>
        </form>
    )
}

export default Form;