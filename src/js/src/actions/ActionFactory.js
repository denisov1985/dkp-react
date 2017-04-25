import ActionHelper from '../utils/ActionHelper';

class ActionFactory
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

            get(id) {
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'get', {
                        id: id
                    }));
                    return fetch('/api/' + entity.replace('_', '/') + '/' + id)
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'get', payload)))
                        .catch(payload => dispatch(ActionHelper.errorAction(entity, 'get', payload)));
                }
            },

            save(data, params) {
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'save', {
                        data: data,
                        params: params
                    }));
                    return fetch('/api/' + entity.replace('_', '/') + '/save/', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'save', payload)))
                        .catch(payload  => dispatch(ActionHelper.errorAction(entity, 'save', payload)));
                }
            },

            unload() {
                return (dispatch, getState) => {
                    dispatch(ActionHelper.receiveAction(entity, 'unload', {}));
                }
            },
        }
    }
}

export default new ActionFactory();