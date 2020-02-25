import { combineReducers } from "redux";
import counter from "./counter";
import fooReducer from "./fooReducer";

const rootReducer = combineReducers({
    counter:counter,
    foo:fooReducer
});

export default rootReducer;