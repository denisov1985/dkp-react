import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';

const initialState = {};

function initialReducer(state = initialState, action) {
    return state;
}

const rootReducer = combineReducers({
    user: ReducerFactory.createCrudReducer('user'),
    auth: ReducerFactory.createAuthReducer()
});

export default rootReducer;