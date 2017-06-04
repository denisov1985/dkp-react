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
                    dispatch(ActionHelper.requestAction(entity, 'get', {
                        id: id
                    }));
                    return fetch('/api/' + entity.replace('_', '/') + '/' + id)
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'get', payload, request)))
                        .catch(payload => dispatch(ActionHelper.errorAction(entity, 'get', payload)));
                }
            },
        }
    }
}

export default new DetailsAction();