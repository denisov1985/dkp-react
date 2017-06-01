import ActionHelper from '../actions/helpers/ActionHelper';
import CollectionHelper from '../utils/CollectionHelper';
import ReducerHelper from '../utils/ReducerHelper';
import ActionFactory from '../actions/ActionFactory';

class CollectionReducer
{
    create(entity) {
        let initialState = {
            status: ActionFactory.STATUS_EMPTY,
            dataset: [],
            join: []
        };

        return (state = initialState, action) => {

            switch (action.type) {
                /**
                 * COLLECTION
                 */
                case ActionHelper.format('request', entity, 'find'):
                    return {
                        ...state,
                        dataset: [],
                        status: ActionFactory.STATUS_FETCHING
                    };
                    break;

                case ActionHelper.format('receive', entity, 'find'):
                    return {
                        ...state,
                        dataset: action.payload,
                        status: ActionFactory.STATUS_COMPLETE
                    };

                    break;

                /**
                 * UPDATE
                 */
                case ActionHelper.format('request', entity, 'update'):
                    return {
                        ...state,
                        join: ReducerHelper.setNested(state.join, this.getPath(action.payload.data.id, action.payload.params.field), ActionFactory.STATUS_FETCHING)
                    };
                    break;

                case ActionHelper.format('receive', entity, 'update'):
                    console.log('Before update');
                    console.log(state);
                    return {
                        ...state,
                        dataset: CollectionHelper.updateData(action.payload.data, state.dataset),
                        join: ReducerHelper.setNested(state.join, this.getPath(action.request.data.id, action.request.params.field), ActionFactory.STATUS_COMPLETE)
                    };

                    break;
            }
            return state;
        }
    }

    getPath(id, field) {
        return [id, field, 'status'];
    }
}

export default new CollectionReducer();