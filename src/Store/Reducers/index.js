import { combineReducers } from "redux";
import ChessReducer from "./ChessReducer";
import PopUpBoxReducer from "./PopUpBoxReducer";
import WebRtcReducer from './WebRtcReducer'
import AccountReducer from "./AccountReducer";

const rootReducer = combineReducers({
    chess: ChessReducer,
    popUpBox: PopUpBoxReducer,
    webRTC: WebRtcReducer,
    account: AccountReducer
})

export default rootReducer;