import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';

const initialState = {};

function initialReducer(state = initialState, action) {
    return state;
}

let memberReducer = ReducerFactory.create('member');

const rootReducer = combineReducers({
    initialReducer,
    memberReducer
});

export default rootReducer;