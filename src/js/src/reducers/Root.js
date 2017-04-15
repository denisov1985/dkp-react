import { combineReducers } from 'redux'

const initialState = {};

function initialReducer(state = initialState, action) {
    return state;
}

const rootReducer = combineReducers({
    initialReducer
});

export default rootReducer;