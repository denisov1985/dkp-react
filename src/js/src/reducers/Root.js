import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';
import CollectionReducer from './CollectionReducer';
import UpdateReducer from './UpdateReducer';
import DeleteReducer from './DeleteReducer';
import DetailsReducer from './DetailsReducer';
import AuthReducer from './AuthReducer';

const initialState = {};

function initialReducer(state = initialState, action) {
    return state;
}

let user = combineReducers({
    collection: CollectionReducer.create('user'),
    update: UpdateReducer.create('user'),
    delete: DeleteReducer.create('user'),
    details: DetailsReducer.create('user')
});

let auth = AuthReducer.create('auth');

const rootReducer = combineReducers({
    initialReducer,
    user,
    auth
});

export default rootReducer;