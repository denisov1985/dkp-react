export default class ActionHelper
{
    /**
     * Generate request action name
     * @param entity
     * @param type
     * @param payload
     * @returns {{type: string, payload: *}}
     */
    static requestAction(entity, type, payload) {
        return {
            type: ['REQUEST', entity.toUpperCase(), type.toUpperCase()].join('_'),
            payload: payload
        };
    }

    /**
     * Generate receive actoin name
     * @param entity
     * @param type
     * @param payload
     * @returns {{type: string, payload: *}}
     */
    static receiveAction(entity, type, payload) {
        return {
            type: ['RECEIVE', entity.toUpperCase(), type.toUpperCase()].join('_'),
            payload: payload
        };
    }

    /**
     * Generate error action name
     * @param entity
     * @param type
     * @param payload
     * @returns {{type: string, payload: *}}
     */
    static errorAction(entity, type, payload) {
        return {
            type: ['ERROR', entity.toUpperCase(), type.toUpperCase()].join('_'),
            payload: payload
        };
    }

    /**
     * Format action name
     * @param status
     * @param entity
     * @param type
     * @returns {string}
     */
    static format(status, entity, type) {
        return [status.toUpperCase(), entity.toUpperCase(), type.toUpperCase()].join('_');
    }

}