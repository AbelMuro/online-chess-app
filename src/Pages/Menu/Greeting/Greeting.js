import React, {useState, useEffect} from 'react';
import convertBase64ToBlobURL from '~/assets/functions/convertBase64ToBlobURL.js';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';


function Greeting(){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const getInfo = async () => {
        try{
            const response = await fetch('https://world-class-chess-server.netlify.app/get_account', {
                method: 'GET',
                credentials: 'include'
            })

            if(response.status === 200){
                const account = await response.json();
                const username = account.username;
                const image = account.image;
                const contentType = account.contentType;

                if(image){
                    const url = convertBase64ToBlobURL(image, contentType);
                    setImage(url);
                }
                setName(username);
            }
            else if(response.status === 403){
                const message = await response.text();
                console.log(message);
                alert('Please enable third-party-cookies in your browser to use this app');
                navigate('/')
            }
            else{
                const message = await response.text();
                console.log(message);
                alert('Internal Server error has occured, please try again later')
            }

        }
        catch(error){
            const message = error.message;
            console.log(message);
            alert('Server is offline, please try again later');
        }
    }

    useEffect(() => {
        getInfo();
    }, [])


    return(
        <section className={styles.container}>
            {image && <img className={styles.photo} src={image}/>}
            <h1 className={styles.title}>
                Hello {name}!
            </h1>
        </section>

    )
}

export default Greeting;