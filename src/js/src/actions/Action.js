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
    }

    /**
     * Format action
     * @param action
     * @param type
     */
    formatAction = (action, type) => [type.toUpperCase(), this.entity.toUpperCase(), action.toUpperCase()].join('_');

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
    createReceiveAction = (action, payload) => this.createAction(action, Action.TYPE_RECEIVE, payload);

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