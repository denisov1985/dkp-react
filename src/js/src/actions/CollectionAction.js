import ActionHelper from './helpers/ActionHelper';

class CollectionAction
{
    constructor(){
        this.STATUS_EMPTY    = 0;
        this.STATUS_FETCHING = 1;
        this.STATUS_COMPLETE = 2;
        this.STATUS_ERROR    = 3;
    }

    create(entity) {
        return {
            findAll() {
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'find', {}));
                    return fetch('/api/' + entity.replace('_', '/'))
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'find', payload)))
                        .catch(payload => dispatch(ActionHelper.errorAction(entity, 'find', payload)));
                }
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