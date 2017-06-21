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
                .then(response => {
                    return response.json();
                })
                .then(response  => {
                    console.log('receive login');
                    console.log(response);
                    if (typeof this.actionProvider.onReceiveResponse === 'function') {
                        console.log('check begin');
                        this.actionProvider.onReceiveResponse(action, response)
                    }
                    console.log('check complete');
                    return dispatch(this.actionProvider.createReceiveAction(action, response))
                })
                .catch(response => dispatch(this.actionProvider.createErrorAction(action, response.result)))
        };
    }
}

ApiRequest.ENDPOINT_URL = '/api/';
export default ApiRequest;