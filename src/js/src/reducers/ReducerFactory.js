import ActionHelper from '../utils/ActionHelper';
import CollectionHelper from '../utils/CollectionHelper';
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
                dataset: {},
                params: {}
            };

        return (state = initialState, action) => {

            switch (action.type) {
                /**
                 * FIND
                 */

                case ActionHelper.format('receive', entity, 'select'):
                    let collection = state.find.dataset.map(a => Object.assign({}, a));
                    collection.map((element, index) => {
                        if (element.data.id === action.payload.id) {
                            element.selected = true;
                        }
                    })
                    return {
                        ...state,
                        find: {
                            ...state.find,
                            dataset: collection
                        }
                    };
                    break;

                case ActionHelper.format('unselect', entity, 'find'):
                    return {
                        ...state,
                        find: {
                            ...state.find,
                            selected: false
                        }
                    };
                    break;

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
                    let collectionFind = []
                    action.payload.map((element, index) => {
                        collectionFind[index] = {
                            data: element,
                            status: {
                                default: 2
                            },
                            selected: false
                        }
                    })
                    return {
                        ...state,
                        find: {
                            ...state.find,
                            dataset: collectionFind,
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
                case ActionHelper.format('request', entity, 'delete'):
                    return {
                        ...state,
                        find: {
                            ...state.find,
                            dataset: CollectionHelper.updateCollection((element, index) => {
                                if (element.selected) {
                                    element.status[action.payload.params.type] = 1;
                                }
                            }, state.find.dataset)
                        }
                    };
                    break;

                case ActionHelper.format('receive', entity, 'delete'):
                    return {
                        ...state,
                        find: {
                            ...state.find,
                            dataset: CollectionHelper.deleteCollection((element, index) => {
                                return (element.selected)
                            }, state.find.dataset)
                        }
                    };
                    break;

                /**
                 * SAVE
                 */
                case ActionHelper.format('request', entity, 'save'):
                    console.log('DATA');
                    console.log(action);
                    console.log(state);
                    return {
                        ...state,
                        save: {
                            dataset: action.payload.data,
                            status: ActionFactory.STATUS_FETCHING,
                            params:  action.payload.params
                        },
                        get: {
                            ...state.get,
                            dataset: action.payload.data
                        },
                        find: {
                            ...state.find,
                            dataset: CollectionHelper.updateStatus(action.payload.data.id, action.payload.params.type, 1, state.find.dataset)
                        }
                    };
                    break;

                case ActionHelper.format('receive', entity, 'save'):
                    return {
                        ...state,
                        save: {
                            dataset: action.payload.object,
                            status: ActionFactory.STATUS_COMPLETE,
                            params: action.payload.params
                        },
                        find: {
                            ...state.find,
                            dataset: CollectionHelper.updateData(action.payload.data, action.payload.params.type, state.find.dataset)
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