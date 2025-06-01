import React, {useRef, useMemo,useEffect, useState} from 'react';

function DisplayLetter({letter}) {
    const currentIndex = useRef(0);
    const [displayedLetters, setDisplayedLetters] = useState('');
    const random = useMemo(() => {
        const letters = 'QWERTYUIOPLKJHGFDSAZXCVBNM';
        let randomizedLetters = '';
        for(let i = 0; i < letters.length; i++){
            let randomIndex = Math.random() * letters.length;
            randomIndex = Math.floor(randomIndex);
            randomizedLetters += letters[randomIndex]
        }
        return `${randomizedLetters}${letter}`;
    }, []);

    const randomizedLetters = () => {
       const interval = setInterval(() => {
            if(currentIndex.current <= random.length - 1)
                setDisplayedLetters(random[currentIndex.current++]); 
            else
                clearInterval(interval);
       }, 70) 
    }

    useEffect(() => {
        randomizedLetters()
    }, [])

    return(
        <span>
            {displayedLetters}
        </span>
    )
}

export default DisplayLetter;