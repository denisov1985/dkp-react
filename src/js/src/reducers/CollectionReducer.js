import ActionHelper from '../actions/helpers/ActionHelper';
import CollectionHelper from '../utils/CollectionHelper';
import ReducerHelper from '../utils/ReducerHelper';
import ActionFactory from '../actions/ActionFactory';

class CollectionReducer
{
    create(entity) {
        let initialState = {
            status: ActionFactory.STATUS_EMPTY,
            dataset: [],
            join: []
        };

        return (state = initialState, action) => {
            console.log(action);
            switch (action.type) {
                case ActionHelper.format('unset', entity, 'find'):
                    return {
                        ...state,
                        dataset: [],
                        status: ActionFactory.STATUS_EMPTY
                    };
                    break;

                /**
                 * COLLECTION
                 */
                case ActionHelper.format('request', entity, 'find'):
                    return {
                        ...state,
                        dataset: [],
                        status: ActionFactory.STATUS_FETCHING
                    };
                    break;

                case ActionHelper.format('receive', entity, 'find'):
                    return {
                        ...state,
                        dataset: action.payload,
                        status: ActionFactory.STATUS_COMPLETE
                    };

                    break;

                /**
                 * UPDATE
                 */
                case ActionHelper.format('request', entity, 'update'):
                    return {
                        ...state,
                        join: ReducerHelper.setNested(state.join, this.getPath(action.payload.data.id,
                            ReducerHelper.getNested(action, ['payload', 'params', 'field'], 'id'),
                            ReducerHelper.getNested(action, ['payload', 'params', 'type'], 'default')), ActionFactory.STATUS_FETCHING)
                    };
                    break;

                case ActionHelper.format('receive', entity, 'update'):
                    return {
                        ...state,
                        dataset: CollectionHelper.updateData(action.payload.data, state.dataset),
                        join: ReducerHelper.setNested(
                            state.join, this.getPath(action.request.data.id,
                                ReducerHelper.getNested(action, ['request', 'params', 'field'], 'id'),
                                ReducerHelper.getNested(action, ['request', 'params', 'type'], 'default')), ActionFactory.STATUS_COMPLETE
                        )
                    };

                    break;

                case ActionHelper.format('request', entity, 'delete'):
                    return {
                        ...state,
                        join: ReducerHelper.setNested(state.join, this.getPath(action.payload.data.id,
                            ReducerHelper.getNested(action, ['payload', 'params', 'field'], 'id'),
                            ReducerHelper.getNested(action, ['payload', 'params', 'type'], 'default')), ActionFactory.STATUS_FETCHING)
                    };
                    break;

                case ActionHelper.format('receive', entity, 'delete'):
                    return {
                        ...state,
                        dataset: CollectionHelper.deleteData(action.payload.data, state.dataset),
                        join: ReducerHelper.setNested(
                            state.join, this.getPath(action.request.data.id,
                                ReducerHelper.getNested(action, ['request', 'params', 'field'], 'id'),
                                ReducerHelper.getNested(action, ['request', 'params', 'type'], 'default')), ActionFactory.STATUS_COMPLETE
                        )
                    };

                    break;
            }
            return state;
        }
    }

    getPath(id, field, type) {
        return [id, field, type, 'status'];
    }
}

export default new CollectionReducer();