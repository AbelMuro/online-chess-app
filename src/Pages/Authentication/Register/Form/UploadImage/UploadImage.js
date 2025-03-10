import React, {useState} from 'react';
import * as styles from './styles.module.css';

function UploadImage(){
    const [image, setImage] = useState(undefined);

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    return(
        <fieldset className={styles.container}>
            <label className={styles.label}>
                Select Photo:
            </label>
            <input type='file' accept='image/png, image/jpeg' name='image' onChange={handleImage} className={styles.input}/>
            {image && <img className={styles.image} src={URL.createObjectURL(image)}/>}
        </fieldset>
        
    )
}

export default UploadImage;