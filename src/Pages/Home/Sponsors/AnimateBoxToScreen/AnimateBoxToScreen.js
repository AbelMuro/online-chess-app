import React, {useEffect, useState, useContext} from 'react';
import AnimateScreen from './AnimateScreen';
import AnimateBox from './AnimateBox';
import {AnimatePresence} from 'framer-motion';
import {BlueScreenContext} from '-/Home.js'


function AnimateBoxToScreen() {
    const {blueBoxTransition} = useContext(BlueScreenContext);
    const [mount, setMount] = useState(false);


    useEffect(() => {
        if(blueBoxTransition === 'first phase')
            setTimeout(() => {
                setMount(false) 
            }, 400)
        else
            setMount(true);
        
    }, [blueBoxTransition])

    return(
        <>
            <AnimateBox mount={mount}/>
            <AnimatePresence>    
                {blueBoxTransition === 'second phase' && <AnimateScreen/>}
            </AnimatePresence>        
        </>

    )
}

export default AnimateBoxToScreen;