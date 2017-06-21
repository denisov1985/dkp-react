import Reducer from './Reducer';
import { Map } from 'immutable';

/**
 * Authenticate reducer
 */
class AuthReducer extends Reducer
{
    initState = () => ({
        response: {
            errorMessage: '',
            result: {}
        },
        loggedIn: window.sessionStorage.getItem('token') ? true : false
    })

    create() {
        return (state = this.getInitialState(), action) => {
            let dataset = {};
            switch (action.type) {
                /**
                 * Request login
                 */
                case this.formatRequestAction('login'):
                    return state.set('response', Map({}))
                        .set('status', this.statusLoading())
                    break;

                /**
                 * Receive login
                  */
                case this.formatReceiveAction('login'):
                    if (action.payload.result.success) {
                        window.sessionStorage.setItem('token', action.payload.result.token)
                    }
                    return state.set('loggedIn', action.payload.result.success)
                        .set('response', Map(action.payload))
                        .set('status', this.statusComplete())
                    break;

                /**
                 * Logout user
                  */
                case this.formatReceiveAction('logout'):
                    return state.set('dataset', Map({}))
                        .set('loggedIn', false);
                    break;

                /**
                 * Update login form
                  */
                case this.formatReceiveAction('update'):
                    return state.updateIn(['dataset'], dataset => dataset.set(action.payload.field, action.payload.value))
                    break;
            }
            return state;
        }
    }
}

export default AuthReducer;