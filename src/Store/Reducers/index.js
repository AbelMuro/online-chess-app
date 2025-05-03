import { combineReducers } from "redux";
import chessReducer from "./chessReducer.js";
import popUpBoxReducer from "./popUpBoxReducer.js";
import webRtcReducer from './WebRtcReducer.js'

const rootReducer = combineReducers({
    chess: chessReducer,
    popUpBox: popUpBoxReducer,
    webRTC: webRtcReducer
})

export default rootReducer;