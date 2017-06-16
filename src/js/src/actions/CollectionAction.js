import ActionHelper from './helpers/ActionHelper';
import ApiRequest from '../middleware/ApiRequest';

class CollectionAction
{
    create(entity) {
        return {
            findAll() {
                return ApiRequest.create(entity, 'find').get();
            },

            unset() {
                return {
                    type: ActionHelper.format('unset', entity, 'find'),
                    payload: [],
                    request: {}
                };
            },
        }
    }
}

export default new CollectionAction();