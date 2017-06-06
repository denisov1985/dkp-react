import ActionHelper from '../actions/helpers/ActionHelper';
import CollectionHelper from '../utils/CollectionHelper';
import ActionFactory from '../actions/ActionFactory';

class DeleteReducer
{
    create(entity) {
        let initialState = {
            status: {
                default: ActionFactory.STATUS_EMPTY
            },
            dataset: {}
        };

        return (state = initialState, action) => {

            switch (action.type) {
                /**
                 * COLLECTION
                 */
                case ActionHelper.format('request', entity, 'delete'):
                    return {
                        dataset: {},
                        status: ActionFactory.STATUS_FETCHING
                    };
                    break;

                case ActionHelper.format('receive', entity, 'delete'):
                    return {
                        dataset: action.payload,
                        status: ActionFactory.STATUS_COMPLETE
                    };

                    break;
            }
            return state;
        }
    }
}

export default new DeleteReducer();