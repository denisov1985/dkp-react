import ActionHelper from './helpers/ActionHelper';

class AuthAction
{
    create(entity) {
        return {
            login(credentials) {
                console.log('LOGIN');
                let request = credentials
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'login', credentials));
                    return fetch('/api/user/login', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    })
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