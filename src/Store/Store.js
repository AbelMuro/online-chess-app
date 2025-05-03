import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './Reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware({serializableCheck: false})
})

export default store;
