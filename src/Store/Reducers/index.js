import { combineReducers } from "redux";
import chessReducer from "./chessReducer.js";
import messageReducer from "./messageReducer.js";
import webRtcReducer from './WebRtcReducer.js'

const rootReducer = combineReducers({
    chess: chessReducer,
    message: messageReducer,
    webRTC: webRtcReducer
})

export default rootReducer;