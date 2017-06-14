import ActionHelper from './helpers/ActionHelper';

class AuthAction
{
    create(entity) {
        return {
            login(id, params) {
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
                    dispatch(ActionHelper.requestAction(entity, 'login', {
                        id: id
                    }));
                    return fetch('/api/login')
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'login', payload, request)))
                        .catch(payload => dispatch(ActionHelper.errorAction(entity, 'login', payload)));
                }
            },

            update(field, value) {
                return {
                    type: ActionHelper.format('update', entity, 'login'),
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

export default new AuthAction();