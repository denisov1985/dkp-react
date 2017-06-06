import ActionHelper from './helpers/ActionHelper';

class DeleteAction
{
    constructor(){
        this.STATUS_EMPTY    = 0;
        this.STATUS_FETCHING = 1;
        this.STATUS_COMPLETE = 2;
        this.STATUS_ERROR    = 3;
    }

    create(entity) {
        return {
            delete(data, params) {
                if (typeof params === 'undefined') {
                    params = {};
                }
                if (typeof params.type === 'undefined') {
                    params.type = 'default';
                }
                let request = {
                    data: data,
                    params: params
                }
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'delete', request));
                    return fetch('/api/' + entity.replace('_', '/') + '/delete/', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: data
                        })
                    })
                        .then(response => response.json())
                        .then(payload => dispatch(ActionHelper.receiveAction(entity, 'delete', payload, request)))
                        .catch(payload => dispatch(ActionHelper.errorAction(entity, 'delete', payload)));
                }
            }
        }
    }
}

export default new DeleteAction();