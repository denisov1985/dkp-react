import Reducer from './Reducer';
import { fromJS, Map } from 'immutable';

/**
 * Authenticate reducer
 */
class AuthReducer extends Reducer
{
    /**
     * Initial state
     */
    initState = () => ({
        response: {},
        loggedIn: false
    })

    /**
     * Create reducer
     * @returns {function(*=, *)}
     */
    create() {
        return (state = this.getInitialState(), action) => {

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
                    return state.set('response', fromJS(action.payload))
                        .set('loggedIn', !!action.payload.token)
                        .set('status', this.statusComplete())
                    break;

                /**
                 * Init user session
                 */
                case this.formatReceiveAction('init_session'):
                    return state.set('loggedIn', !!action.payload.token);
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