import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useBlocker} from 'react-router-dom';

function useConfirmNavigation(shouldBlock) {
    const block = useBlocker(shouldBlock);
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

    return block;
}

export default useConfirmNavigation;