import React, {useEffect} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import DisplayPopupMessage from './assets/Components/DisplayPopupMessage';
import './global.css';



function App() {


    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.onload = () => {
           window.scrollTo({top: 0, behavior: 'instant'}); 
        }
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/menu",
            element: <Menu />,
        },
        {
            path: "/selectoptions",
            element: <SelectOptions />,
        },
        {
            path: "/queue",
            element: <Queue />,
        },
        {
            path: "/chessboard/:matchId",
            element: <Chessboard />,
        },
        {
            path: "/forgotpassword",
            element: <ForgotPassword />,
        },
        {
            path: "/resetpassword/:token",
            element: <ResetPassword />,
        },
    ])

    return(
        <Provider store={store}>
            <PersistGate 
                loading={null}
                persistor={persistedStore}>
                    <DisplayPopupMessage/>
                    <RouterProvider router={router}/>
            </PersistGate>
        </Provider>
    )
}

export default App;