import ActionHelper from '../actions/helpers/ActionHelper';
import CollectionHelper from '../utils/CollectionHelper';
import ActionFactory from '../actions/ActionFactory';

class ReducerFactory
{
    create(entity) {
        let initialState = {
            status: {
                default: ActionFactory.STATUS_EMPTY
            },
            dataset: []
        };

        return (state = initialState, action) => {

            switch (action.type) {
                /**
                 * COLLECTION
                 */
                case ActionHelper.format('request', entity, 'find'):
                    return {
                        ...state,
                        status: ActionFactory.STATUS_FETCHING
                    };
                    break;

                case ActionHelper.format('receive', entity, 'find'):
                    let result = action.payload.map((element, index) => {
                        return {
                            dataset: element,
                            params: {}
                        }
                    });

                    return {
                        ...state,
                        dataset: result,
                        status: ActionFactory.STATUS_COMPLETE
                    };

                    break;
            }
            return state;
        }
    }
}

export default new ReducerFactory();