import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer';
import DeleteReducer from './DeleteReducer';
import DetailsReducer from './DetailsReducer';
import CollectionReducer from './CollectionReducer';
import UpdateReducer from './UpdateReducer';

/**
 * Reducer factory helps create common reducers
 */
export default class ReducerFactory
{
    static createAuthReducer() {
        return new AuthReducer('user').create()
    }

    static createCrudReducer(entity) {
        return combineReducers({
            collection: CollectionReducer.create(entity),
            update: UpdateReducer.create(entity),
            delete: DeleteReducer.create(entity),
            details: DetailsReducer.create(entity)
        })
    }

    static createReadReducer(entity) {
        return combineReducers({
            collection: CollectionReducer.create(entity),
            details: DetailsReducer.create(entity)
        })
    }

}