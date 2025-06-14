import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useBlocker} from 'react-router-dom';

//this is where i left off, i may need to find a more reliable way of reseting the state

function useConfirmNavigation(shouldBlock) {
    const block = useBlocker(shouldBlock);
    const dispatch = useDispatch();

    useEffect(() => {
        if(block.state !== 'blocked') return;

        const confirmed = confirm('Are you sure you want to leave? You will forfeit the match in doing so');
        if(confirmed){
            dispatch({type: 'RESET_STATE'});
            block.proceed();
        }
            
        else
            block.reset();
    }, [block.state])

    return block;
}

export default useConfirmNavigation;