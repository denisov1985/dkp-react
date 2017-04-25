import ActionHelper from '../utils/ActionHelper';
import ActionFactory from '../actions/ActionFactory';

class ReducerFactory
{
    create(entity) {
        let initialState = {};
        initialState.save
            = initialState.delete
            = initialState.get
            = initialState.find
            = {
                status: ActionFactory.STATUS_EMPTY,
                dataset: {}
            };

        return (state = initialState, action) => {
            switch (action.type) {
                /**
                 * FIND
                 */
                case ActionHelper.format('request', entity, 'find'):
                    return {
                        ...state,
                        find: {
                            ...state.find,
                            status: ActionFactory.STATUS_FETCHING
                        }
                    };
                    break;

                case ActionHelper.format('receive', entity, 'find'):
                    return {
                        ...state,
                        find: {
                            dataset: action.payload,
                            status: ActionFactory.STATUS_COMPLETE
                        }
                    };
                    break;

                /**
                 * GET
                 */
                case ActionHelper.format('request', entity, 'get'):
                    return {
                        ...state,
                        get: {
                            ...state.get,
                            status: ActionFactory.STATUS_FETCHING
                        }
                    };
                    break;

                case ActionHelper.format('receive', entity, 'get'):
                    return {
                        ...state,
                        get: {
                            dataset: action.payload,
                            status: ActionFactory.STATUS_COMPLETE
                        }
                    };
                    break;

                /**
                 * SAVE
                 */
                case ActionHelper.format('request', entity, 'save'):
                    return {
                        ...state,
                        save: {
                            dataset: action.payload,
                            status: ActionFactory.STATUS_FETCHING
                        },
                        get: {
                            ...state.get,
                            dataset: action.payload
                        }
                    };
                    break;

                case ActionHelper.format('receive', entity, 'save'):
                    let collection = state.find.dataset;
                    let foundInCollection = false;
                    collection.map((element, index) => {
                        if (element.id === action.payload.object.id) {
                            collection[index] = action.payload.object;
                            foundInCollection = true;
                        }
                    });
                    if (!foundInCollection) {
                        collection.push(action.payload.object)
                    }
                    return {
                        ...state,
                        save: {
                            dataset: action.payload,
                            status: ActionFactory.STATUS_COMPLETE
                        },
                        find: {
                            ...state.find,
                            dataset: collection
                        }
                    };
                    break;

                /**
                 * UNLOAD
                 */
                case ActionHelper.format('receive', entity, 'unload'):
                    return {
                        ...state,
                        save: initialState.save,
                        delete: initialState.delete,
                        get: initialState.get,
                    };
                    break;
            }
            return state;
        }
    }
}

export default new ReducerFactory();