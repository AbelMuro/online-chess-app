import { combineReducers } from "redux";
import ChessReducer from "./ChessReducer";
import PopUpBoxReducer from "./PopUpBoxReducer";
import WebRtcReducer from './WebRtcReducer'
import AccountReducer from "./AccountReducer";
import GameSettingsReducer from "./GameSettingsReducer";
import TimerReducer from "./TimerReducer";

const rootReducer = combineReducers({
    chess: ChessReducer,
    popUpBox: PopUpBoxReducer,
    webRTC: WebRtcReducer,
    account: AccountReducer,
    settings: GameSettingsReducer,
    timer: TimerReducer
})

export default rootReducer;