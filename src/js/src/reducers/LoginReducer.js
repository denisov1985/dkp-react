import ActionHelper from '../utils/ActionHelper';
import CollectionHelper from '../utils/CollectionHelper';
import ActionFactory from '../actions/ActionFactory';

class LoginReducer
{
    create(entity) {
        let initialState = {
            status: ActionFactory.STATUS_EMPTY,
            dataset: {},
            response: {}
        };

        return (state = initialState, action) => {
            let dataset = {};
            console.log(action);
            console.log(ActionHelper.format('request', entity, 'login'));
            switch (action.type) {
                /**
                 * Request details
                 */
                case ActionHelper.format('request', entity, 'login'):
                    console.log('request login');
                    return {
                        ...state,
                        response: {},
                        status: ActionFactory.STATUS_FETCHING
                    };
                    break;

                /**
                 * Receive details
                  */
                case ActionHelper.format('receive', entity, 'login'):
                    return {
                        ...state,
                        response: action.payload,
                        status: ActionFactory.STATUS_COMPLETE
                    };
                    break;

                /**
                 * Unset details
                  */
                case ActionHelper.format('unset', entity, 'login'):
                    return {
                        ...state,
                        dataset: {},
                        status: ActionFactory.STATUS_EMPTY
                    };
                    break;

                /**
                 * Update details
                  */
                case ActionHelper.format('update', entity, 'login'):
                    dataset = {...state.dataset};
                    dataset[action.payload.field] = action.payload.value;
                    return {
                        ...state,
                        dataset: dataset
                    };
                    break;
            }
            return state;
        }
    }
}

export default new LoginReducer();