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
                case ActionHelper.format('request', entity, 'details'):
                    return state;
                    break;

                case ActionHelper.format('receive', entity, 'details'):
                    return state;
                    break;
            }
            return state;
        }
    }
}

export default new DetailsReducer();