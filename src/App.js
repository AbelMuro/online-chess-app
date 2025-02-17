import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';
import Chessboard from './Pages/Chessboard';
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';
import Menu from './Pages/Menu'
import './global.css';

function App() {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/menu' element={<Menu/>}/>
                    <Route path='/chessboard' element={<Chessboard/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;