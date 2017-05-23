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

            console.log(action);

            switch (action.type) {
                /**
                 * FIND
                 */

                case ActionHelper.format('receive', entity, 'select'):
                    let collection = [...state.find.dataset];
                    let result = collection.reduce((items, element) => {
                        let newItems = [];
                        if (typeof items !== 'undefined') {
                            newItems = [...items];
                        }
                        newItems.push({
                            ...element,
                            selected: true
                        });
                        return newItems;
                    })

                    console.log(collection);
                    console.log(result);


                    return {
                        ...state,
                        find: {
                            ...state.find
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
                case ActionHelper.format('request', entity, 'save'):
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