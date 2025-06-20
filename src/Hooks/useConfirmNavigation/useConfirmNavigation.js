import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useBlocker} from 'react-router-dom';

/* 
    this is where i left off, i need to update my notes on useBlocker() in the react-router-dom section
*/


function useConfirmNavigation(initialBlock) {
    const [shouldBlock, setShouldBlock] = useState(initialBlock);
    const block = useBlocker(() => shouldBlock);
    const dispatch = useDispatch();

    useEffect(() => {
        if(block.state !== 'blocked') return;

        const confirmed = confirm('Are you sure you want to leave?');
        if(confirmed){
            dispatch({type: 'RESET_STATE'});
            block.proceed();
        }
            
        else
            block.reset();

    }, [block.state])

    return [block, shouldBlock, setShouldBlock];
}

export default useConfirmNavigation;