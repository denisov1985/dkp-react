import ActionHelper from './helpers/ActionHelper';

class UpdateAction
{
    constructor(){
        this.STATUS_EMPTY    = 0;
        this.STATUS_FETCHING = 1;
        this.STATUS_COMPLETE = 2;
        this.STATUS_ERROR    = 3;
    }

    create(entity) {
        return {
            save(data, params) {
                let request = {
                    data: data,
                    params: params
                }
                if (typeof params === 'undefined') {
                    params = {};
                }
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'update', request));
                    return fetch('/api/' + entity.replace('_', '/') + '/save/', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: data
                        })
                    })
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'update', payload, request)))
                        .catch(payload  => dispatch(ActionHelper.errorAction(entity, 'update', payload)));
                }
            }
        }
    }
}

export default new UpdateAction();