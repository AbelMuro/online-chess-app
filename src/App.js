import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';
import ForgotPassword from './Pages/Authentication/ForgotPassword';
import ResetPassword from './Pages/Authentication/ResetPassword';
import Chessboard from './Pages/Chessboard';
import SelectOptions from './Pages/SelectOptions';
import FindPlayers from './Pages/FindPlayers';
import Menu from './Pages/Menu';
import DisplayMessage from './assets/Components/DisplayMessage';
import './global.css';

function App() {

    useEffect(() => {
        const fetchFunction = async () => {
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
                const result = await response.json();
                console.log(result);
            }
            catch(error){
                const message = error.message;
                console.log(message);
            }
        };

        fetchFunction();
    }, [])

    return(
        <Provider store={store}>
            <BrowserRouter>
                <DisplayMessage/>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/menu' element={<Menu/>}/>
                    <Route path='/selectoptions' element={<SelectOptions/>}/>
                    <Route path='/findplayers' element={<FindPlayers/>}/>
                    <Route path='/chessboard/:matchId' element={<Chessboard/>}/>
                    <Route path='/forgotpassword' element={<ForgotPassword/>}/>
                    <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;