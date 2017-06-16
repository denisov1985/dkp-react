class ApiRequest
{
    create(entity, action) {
        const createAction = (payload, type) => ({
            type: [type.toUpperCase(), entity.toUpperCase(), action.toUpperCase()].join('_'),
            payload: payload
        });

        const createEndpointUrl = () => ApiRequest.ENDPOINT_URL + entity.replace('_', '/').toLowerCase() + '/' + action.toLowerCase();

        const createHeaders = () => {
            let headers = {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
            let token = window.sessionStorage.getItem('token');
            if (token) {
                headers.Bearer = token;
            }
            return headers;
        }

        return {
            /**
             * Get request
             * @param payload
             * @returns {function(*, *)}
             */
            get: (payload) => {
                return (dispatch, getState) => {
                    dispatch(createAction(payload, 'request'));
                    return fetch(createEndpointUrl(), {
                        method: 'get',
                        headers: createHeaders()
                    })
                        .then(raw => raw.json())
                        .then(response  => dispatch(createAction(response.result, 'receive')))
                        .catch(response => dispatch(createAction(response.result, 'error')))
                };
            },

            /**
             * Post request
             * @param payload
             * @returns {function(*, *)}
             */
            post: (payload) => {
                return (dispatch, getState) => {
                    dispatch(createAction(payload, 'request'));
                    return fetch(createEndpointUrl(), {
                        method: 'get',
                        headers: createHeaders(),
                        body: JSON.stringify(payload)
                    })
                        .then(raw => raw.json())
                        .then(response  => dispatch(createAction(response.result, 'receive')))
                        .catch(response => dispatch(createAction(response.result, 'error')))
                };
            }
        }
    }
}

ApiRequest.ENDPOINT_URL = '/api/';
export default new ApiRequest();