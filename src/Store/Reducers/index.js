import { combineReducers } from "redux";
import chessReducer from "./chessReducer";

const rootReducer = combineReducers({
    chess: chessReducer
})

export default rootReducer;