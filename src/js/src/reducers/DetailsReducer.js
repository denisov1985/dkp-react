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

            console.log(action);
            console.log( ActionHelper.format('receive', entity, 'details'));

            switch (action.type) {
                case ActionHelper.format('request', entity, 'details'):
                    return {
                        ...state,
                        dataset: {},
                        status: ActionFactory.STATUS_FETCHING
                    };
                    break;

                case ActionHelper.format('receive', entity, 'details'):
                    console.log('okoko');
                    return {
                        ...state,
                        dataset: action.payload,
                        status: ActionFactory.STATUS_COMPLETE
                    };
                    break;

                case ActionHelper.format('unset', entity, 'details'):
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