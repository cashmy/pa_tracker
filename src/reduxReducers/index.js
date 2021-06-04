import { combineReducers } from 'redux'
import auth from "./auth";
import message from "./message";
import clinic from "./clinic";

export default combineReducers({
    auth,
    message,
    clinic,
});
