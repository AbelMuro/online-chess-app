import {useState, useEffect} from 'react';

function useLocalStorage(key) {
    const [state, setState] = useState(localStorage.getItem(key));


    useEffect(() => {
        if(!state) return;

        localStorage.setItem(key, state);
    }, [state])

    return [state, setState];
}

export default useLocalStorage;