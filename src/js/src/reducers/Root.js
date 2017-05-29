import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';
import CollectionReducer from './CollectionReducer';

const initialState = {};

function initialReducer(state = initialState, action) {
    return state;
}

let memberReducer = ReducerFactory.create('member');
let userReducer = ReducerFactory.create('user');
let testReducer = ReducerFactory.create('test');

let users = combineReducers({
    collection: CollectionReducer.create('member')
});

const rootReducer = combineReducers({
    initialReducer,
    memberReducer,
    users
});

export default rootReducer;