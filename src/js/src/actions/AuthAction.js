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
            }),

            /**
             * Init user session
             */
            initSession: () => {
                return this.createReceiveAction('init_session', {
                    token: window.sessionStorage.getItem('token')
                });
            }
        }
    }

    /**
     * Save token to session storage
     * @param action
     * @param response
     */
    onReceiveResponse(action, response) {
        switch (action) {
            case 'login':
                if (response.result.success) {
                    window.sessionStorage.setItem('token', response.result.token)
                }
                break;
        }
    }

}

export default AuthAction;