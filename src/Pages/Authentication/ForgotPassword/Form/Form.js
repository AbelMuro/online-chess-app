import React, {useState} from 'react';
import EnterEmail from '~/assets/Components/EnterEmail';
import { ClipLoader } from 'react-spinners';
import * as styles from './styles.module.css';

function Form() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        setError('');
        setLoading(true);

        try{
            const response = await fetch('https://world-class-chess-server-hcp9qz4vq-abelmuros-projects.vercel.app/forgotpassword', {
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
                alert('Email has been sent');
            }
            
            else if(response.status === 401)
                setError("Email doesnt't exist");
            
            else{
                const message = await response.text();
                alert('Internal Server Error has occurred, please try again later.')
                console.log(message);
            }
                
        }
        catch(error){
            alert('Server is offline, please try again later.')
            console.log(error.message);
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