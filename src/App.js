import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistedStore} from './Store';
import NavigationBar from '~/Common/Components/NavigationBar';
import Home from './Pages/Home'
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';
import ForgotPassword from './Pages/Authentication/ForgotPassword';
import ResetPassword from './Pages/Authentication/ResetPassword';
import Chessboard from './Pages/Chessboard';
import SelectOptions from './Pages/SelectOptions';
import Queue from './Pages/Queue';
import Menu from './Pages/Menu';
import DisplayPopupMessage from '~/Common/Components/DisplayPopupMessage';
import './global.css';

/* this is where i left off, i need to update my notes on react-router-dom*/


function App() {

    const Layout = () => {
            return (
                <>
                    <NavigationBar/>
                    <Outlet/>
                </>
            )
        }


    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "menu",
                    element: <Menu />,
                },
                {
                    path: "selectoptions",
                    element: <SelectOptions />,
                },
                {
                    path: "queue",
                    element: <Queue />,
                },
                {
                    path: "chessboard/:matchId",
                    element: <Chessboard />,
                },
                {
                    path: "forgotpassword",
                    element: <ForgotPassword />,
                },
                {
                    path: "resetpassword/:token",
                    element: <ResetPassword />,
                },
            ]
        }
    ])

    return(
        <Provider store={store}>
            <PersistGate 
                loading={null}
                persistor={persistedStore}>
                    <DisplayPopupMessage/>
                    <RouterProvider router={router}>
                        <NavigationBar/>    
                    </RouterProvider>
            </PersistGate>
        </Provider>
    )
}

export default App;