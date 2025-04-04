import { combineReducers } from "redux";
import chessReducer from "./chessReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
    chess: chessReducer,
    message: messageReducer,
})

export default rootReducer;