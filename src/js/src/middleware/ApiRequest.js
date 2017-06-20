class ApiRequest
{

    /**
     * Class constructor
     */
    constructor(entity, actionProvider) {
        this.entity = entity;
        this.actionProvider = actionProvider;
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
    getEndpoint = (action) => {
        return ApiRequest.ENDPOINT_URL + this.entity.replace('_', '/').toLowerCase() + '/' + action.toLowerCase()
    };

    /**
     * Get request action
     */
    sendGet(action, payload) {
        return (dispatch, getState) => {
            dispatch(this.actionProvider.createRequestAction(action, payload));
            return fetch(this.getEndpoint(action), {
                method: 'get',
                headers: this.getHeaders()
            })
                .then(raw => raw.json())
                .then(response  => dispatch(this.actionProvider.createReceiveAction(action, response.result)))
                .catch(response => dispatch(this.actionProvider.createErrorAction(action, response.result)))
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
                .then(raw => raw.json())
                .then(response  => dispatch(this.actionProvider.createReceiveAction(action, response.result)))
                .catch(response => dispatch(this.actionProvider.createErrorAction(action, response.result)))
        };
    }
}

ApiRequest.ENDPOINT_URL = '/api/';
export default ApiRequest;