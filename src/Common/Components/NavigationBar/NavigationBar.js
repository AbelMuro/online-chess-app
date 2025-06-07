import React from 'react';
import {useLocation} from 'react-router-dom';
import NavigationBarForHomePage from './NavigationBarForHomePage';
import NavigationBarForOtherPages from './NavigationBarForOtherPages';

function NavigationBar(){
    const {pathname} = useLocation();

    return(
        <>
            {pathname === '/' ? <NavigationBarForHomePage/> : <NavigationBarForOtherPages/>}
        </>
    )
}

export default NavigationBar;