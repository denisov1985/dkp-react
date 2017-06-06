import ActionHelper from './helpers/ActionHelper';

class DetailsAction
{
    constructor(){
        this.STATUS_EMPTY    = 0;
        this.STATUS_FETCHING = 1;
        this.STATUS_COMPLETE = 2;
        this.STATUS_ERROR    = 3;
    }

    create(entity) {
        return {

            add() {
                return {
                    type: ActionHelper.format('receive', entity, 'details'),
                    payload: {},
                    request: {}
                };
            },

            get(id, params) {
                let request = {
                    id: id,
                    params: params
                }
                if (typeof params === 'undefined') {
                    params = {};
                }
                if (typeof params.type === 'undefined') {
                    params.type = 'default';
                }
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'details', {
                        id: id
                    }));
                    return fetch('/api/' + entity.replace('_', '/') + '/' + id)
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'details', payload, request)))
                        .catch(payload => dispatch(ActionHelper.errorAction(entity, 'details', payload)));
                }
            },

            unset() {
                return {
                    type: ActionHelper.format('unset', entity, 'details'),
                    payload: {},
                    request: {}
                };
            },

            update(field, value) {
                return {
                    type: ActionHelper.format('update', entity, 'details'),
                    payload: {
                        field: field,
                        value: value
                    },
                    request: {}
                };
            }
        }
    }
}

export default new DetailsAction();