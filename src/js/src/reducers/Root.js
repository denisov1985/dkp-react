import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';
import CollectionReducer from './CollectionReducer';
import UpdateReducer from './UpdateReducer';
import DeleteReducer from './DeleteReducer';
import DetailsReducer from './DetailsReducer';
import LoginReducer from './LoginReducer';

const initialState = {};

function initialReducer(state = initialState, action) {
    return state;
}

let memberReducer = ReducerFactory.create('member');
let userReducer = ReducerFactory.create('user');
let testReducer = ReducerFactory.create('test');

let user = combineReducers({
    collection: CollectionReducer.create('user'),
    update: UpdateReducer.create('user'),
    delete: DeleteReducer.create('user'),
    details: DetailsReducer.create('user'),
    login: LoginReducer.create('user')
});

const rootReducer = combineReducers({
    initialReducer,
    memberReducer,
    user
});

export default rootReducer;