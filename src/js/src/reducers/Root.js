import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';

const rootReducer = combineReducers({
    user: ReducerFactory.createCrudReducer('user'),
    region: ReducerFactory.createCrudReducer('region'),
    auth: ReducerFactory.createAuthReducer()
});

export default rootReducer;