import { combineReducers } from 'redux'
import ReducerFactory from './ReducerFactory';

const rootReducer = combineReducers({
    user: ReducerFactory.createCrudReducer('user'),
    region: ReducerFactory.createCrudReducer('region'),
    product: ReducerFactory.createCrudReducer('product'),
    category: ReducerFactory.createCrudReducer('category'),
    auth: ReducerFactory.createAuthReducer()
});

export default rootReducer;