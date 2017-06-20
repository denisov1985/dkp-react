import Action from './Action';

class AuthAction extends Action
{
    create() {
        return {
            /**
             * Login action
             * @param credentials
             */
            login: (credentials) => this.getApi().sendPost('login', credentials),

            /**
             * Logout action
             * @returns {*}
             */
            logout: () => {
                window.sessionStorage.removeItem('token');
                return this.createReceiveAction('logout', {});
            },

            /**
             * Update login form action
             * @param field
             * @param value
             */
            update: (field, value) => this.createReceiveAction('update', {
                field: field,
                value: value
            })
        }
    }
}

export default AuthAction;