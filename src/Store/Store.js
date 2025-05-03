import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './Reducers';
import { persistStore, persistReducer} from 'redux-persist';
import { getPersistConfig } from 'redux-deep-persist';
import storage from 'redux-persist/lib/storage';    

const config = getPersistConfig({
    key: 'chess-account-data',
    storage,
    whitelist: ['account'],  
    rootReducer
})


const persistedReducer = persistReducer(config, rootReducer);   

const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) => defaultMiddleware({serializableCheck: false})
})

export const persistedStore = persistStore(store); 
export default store;
