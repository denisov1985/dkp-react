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
                if (params === undefined) {
                    params = {
                        type: 'default'
                    };
                }
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
                        body: JSON.stringify({
                            data: data,
                            params: params
                        })
                    })
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'save', payload)))
                        .catch(payload  => dispatch(ActionHelper.errorAction(entity, 'save', payload)));
                }
            },

            delete(data, params) {
                if (params === undefined) {
                    params = {
                        type: 'default'
                    };
                }
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'delete', {
                        data: data,
                        params: params
                    }));
                    return fetch('/api/' + entity.replace('_', '/') + '/delete/', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: data,
                            params: params
                        })
                    })
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'delete', payload)))
                        .catch(payload  => dispatch(ActionHelper.errorAction(entity, 'delete', payload)));
                }
            },

            unload() {
                return (dispatch, getState) => {
                    dispatch(ActionHelper.receiveAction(entity, 'unload', {}));
                }
            },

            select(record) {
                return (dispatch, getState) => {
                    dispatch(ActionHelper.receiveAction(entity, 'select', record));
                }
            }
        }
    }
}

export default new ActionFactory();