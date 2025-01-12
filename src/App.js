import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';
import Chessboard from './Pages/Chessboard';
import './global.css';

function App() {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Chessboard/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;