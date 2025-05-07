import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistedStore} from './Store';
import Home from './Pages/Home'
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';
import ForgotPassword from './Pages/Authentication/ForgotPassword';
import ResetPassword from './Pages/Authentication/ResetPassword';
import Chessboard from './Pages/Chessboard';
import SelectOptions from './Pages/SelectOptions';
import Queue from './Pages/Queue';
import Menu from './Pages/Menu';
import DisplayMessage from './assets/Components/DisplayMessage';
import './global.css';

function App() {

    return(
        <Provider store={store}>
            <PersistGate 
                loading={null}
                persistor={persistedStore}>
                    <BrowserRouter>
                        <DisplayMessage/>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/menu' element={<Menu/>}/>
                            <Route path='/selectoptions' element={<SelectOptions/>}/>
                            <Route path='/queue' element={<Queue/>}/>
                            <Route path='/chessboard/:matchId' element={<Chessboard/>}/>
                            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
                            <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
                        </Routes>
                    </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App;