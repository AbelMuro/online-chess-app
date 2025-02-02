import {configureStore} from '@reduxjs/toolkit';
import { checkCurrentTurn } from './Middleware';
import rootReducer from './Reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkCurrentTurn) 
})

export default store;
