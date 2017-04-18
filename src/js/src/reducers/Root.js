import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';

const initialState = {};

function initialReducer(state = initialState, action) {
    return state;
}

let userReducer = ReducerFactory.create('user');

const rootReducer = combineReducers({
    initialReducer,
    userReducer
});

export default rootReducer;