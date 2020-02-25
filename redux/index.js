import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [logger, thunk]
export const makeStore = (initialState, options) => {
    return createStore(reducer, initialState, applyMiddleware(...middlewares));
};
