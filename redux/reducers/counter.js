import { SET_COUNT }  from '../actionTypes';

const initialState = { 
    count: null
}

const counter = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNT:
            return {
                ...state,
                count: action.payload
            };
        default:
            return state 
    }
}
export default counter