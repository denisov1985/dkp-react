import ApiRequest from '../middleware/ApiRequest';
/**
 * Default action class
 */
export default class Action
{
    /**
     * Class constructor
     * @param entity
     */
    constructor(entity) {
        this.entity = entity;
        this.api    = new ApiRequest(entity, this);

        this.TYPE_REQUEST = 'request'
        this.TYPE_RECEIVE = 'receive'
        this.TYPE_ERROR   = 'error'
    }

    /**
     * Format action
     * @param action
     * @param type
     */
    formatAction = (action, type) => [type.toUpperCase(), this.entity.toUpperCase(), action.toUpperCase()].join('_');

    /**
     * Format receive action
     * @param action
     */
    formatReceiveAction = (action) => [Action.TYPE_RECEIVE.toUpperCase(), this.entity.toUpperCase(), action.toUpperCase()].join('_');

    /**
     * Format request action
     * @param action
     */
    formatRequestAction = (action) => [Action.TYPE_REQUEST.toUpperCase(), this.entity.toUpperCase(), action.toUpperCase()].join('_');

    /**
     * Create action helper
     * @param action
     * @param type
     */
    createAction = (action, type, payload) => ({
        type: this.formatAction(action, type),
        payload: payload
    });

    /**
     * Create request action
     * @param action
     */
    createRequestAction = (action, payload) => this.createAction(action, Action.TYPE_REQUEST, payload);

    /**
     * Create receive action
     * @param action
     */
    createReceiveAction = (action, payload) => {
        //console.log(this.createAction(action, Action.TYPE_RECEIVE, payload));
        return this.createAction(action, Action.TYPE_RECEIVE, payload)
    };

    /**
     * Create error action
     * @param action
     */
    createErrorAction = (action, payload) => this.createAction(action, Action.TYPE_RECEIVE, payload);

    /**
     * Get api request
     */
    getApi = () => this.api;
}

Action.TYPE_REQUEST = 'request'
Action.TYPE_RECEIVE = 'receive'
Action.TYPE_ERROR   = 'error'
