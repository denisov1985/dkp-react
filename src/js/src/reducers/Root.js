import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';

const rootReducer = combineReducers({
    user: ReducerFactory.createCrudReducer('user'),
    auth: ReducerFactory.createAuthReducer()
});

export default rootReducer;