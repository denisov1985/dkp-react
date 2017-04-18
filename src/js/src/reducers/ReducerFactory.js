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

        return function(state = initialState, action) {
            switch (action.type) {
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
            }
            return state;
        }
    }
}

export default new ReducerFactory();