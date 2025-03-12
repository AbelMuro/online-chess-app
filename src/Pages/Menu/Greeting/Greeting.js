import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import * as styles from './styles.module.css';


//this is where i left off, i still dont fully understand the logic in receiving files from servers
function Greeting(){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const getName = async () => {
        try{
            const response = await fetch('http://localhost:4000/get_account', {
                method: 'GET',
                credentials: 'include'
            })

            if(response.status === 200){
                const account = await response.json();
                const username = account.username;
                const image = account.image;

                if(image){
                    const binaryData = atob(image);                             //decode base64 into binary string
                    const byteArray = new Uint8Array(binaryData.length);

                    for(let i = 0; i < binaryData.length; i++){
                        byteArray[i] = binaryData.charCodeAt(i)
                    }

                    const blob = new Blob([byteArray], {type: account.contentType});
                    setImage(URL.createObjectURL(blob));
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
        getName();
    }, [])

    useEffect(() => {
        console.log(image);
    }, [image])

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