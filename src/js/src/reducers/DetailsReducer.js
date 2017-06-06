import ActionHelper from '../utils/ActionHelper';
import CollectionHelper from '../utils/CollectionHelper';
import ActionFactory from '../actions/ActionFactory';

class DetailsReducer
{
    create(entity) {
        let initialState = {
            status: ActionFactory.STATUS_EMPTY,
            dataset: {}
        };

        return (state = initialState, action) => {
            switch (action.type) {
                /**
                 * Request details
                 */
                case ActionHelper.format('request', entity, 'details'):
                    return {
                        ...state,
                        dataset: {},
                        status: ActionFactory.STATUS_FETCHING
                    };
                    break;

                /**
                 * Receive details
                  */
                case ActionHelper.format('receive', entity, 'details'):
                    return {
                        ...state,
                        dataset: action.payload,
                        status: ActionFactory.STATUS_COMPLETE
                    };
                    break;

                /**
                 * Unset details
                  */
                case ActionHelper.format('unset', entity, 'details'):
                    return {
                        ...state,
                        dataset: {},
                        status: ActionFactory.STATUS_EMPTY
                    };
                    break;

                /**
                 * Update details
                  */
                case ActionHelper.format('update', entity, 'details'):
                    let dataset = {...state.dataset};
                    dataset[action.payload.field] = action.payload.value;
                    return {
                        ...state,
                        dataset: dataset
                    };
                    break;

                /**
                 * Delete details
                  */
                case ActionHelper.format('receive', entity, 'delete'):
                    if (action.request.data.id !== state.dataset.id) {
                        return state;
                    }
                    return {
                        ...state,
                        dataset: {},
                        status: ActionFactory.STATUS_EMPTY
                    };

                    break;
            }
            return state;
        }
    }
}

export default new DetailsReducer();