import {useEffect} from 'react';
import {useBlocker} from 'react-router-dom';

function useConfirmNavigation(shouldBlock) {
    const block = useBlocker(shouldBlock);

    useEffect(() => {
        if(block.state !== 'blocked') return;

        const confirmed = confirm('Are you sure you want to leave? You will forfeit the match in doing so');
        if(confirmed)
            block.proceed();
        else
            block.reset();
    }, [block.state])

    return block;
}

export default useConfirmNavigation;