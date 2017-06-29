class ApiRequest
{

    /**
     * Class constructor
     */
    constructor(entity, actionProvider) {
        this.entity = entity;
        this.actionProvider = actionProvider;

        this.STATUS_EMPTY    = 0;
        this.STATUS_LOADING  = 1;
        this.STATUS_COMPLETE = 2;
        this.STATUS_ERROR    = 3;
    }

    /**
     * Get all headers
     */
    getHeaders() {
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

    /**
     * Create endpoint URL helper
     */
    getEndpoint = (action, payload) => {
        const query = (payload && payload.query) ? payload.query : {};
        const parts = Object.values(query);
        let params = parts.join('/');
        if (params) {
            params = '/' + params;
        }
        return ApiRequest.ENDPOINT_URL + this.entity.replace('_', '/').toLowerCase() + '/' + action.toLowerCase() + params
    };

    /**
     * Get request action
     */
    sendGet(action, payload) {
        return (dispatch, getState) => {
            dispatch(this.actionProvider.createRequestAction(action, payload));
            return fetch(this.getEndpoint(action, payload), {
                method: 'get',
                headers: this.getHeaders()
            })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    return dispatch(this.actionProvider.createReceiveAction(action, response));
                })
                .catch(response => dispatch(this.actionProvider.createErrorAction(action, response)))
        };
    };

    /**
     * Send POST request
     * @param action
     * @param payload
     * @returns {function(*, *)}
     */
    sendPost(action, payload) {
        return (dispatch, getState) => {
            dispatch(this.actionProvider.createRequestAction(action, payload));
            return fetch(this.getEndpoint(action), {
                method: 'post',
                headers: this.getHeaders(),
                body: JSON.stringify(payload)
            })
                .then(response => {
                    return response.json();
                })
                .then(response  => {
                    if (typeof this.actionProvider.onReceiveResponse === 'function') {
                        this.actionProvider.onReceiveResponse(action, response)
                    }
                    return dispatch(this.actionProvider.createReceiveAction(action, response))
                })
                .catch(response => dispatch(this.actionProvider.createErrorAction(action, response.result)))
        };
    }
}

ApiRequest.ENDPOINT_URL = '/api/';
export default ApiRequest;