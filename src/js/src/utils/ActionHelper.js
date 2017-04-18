export default class ActionHelper
{
    static requestAction(entity, type, payload) {
        return {
            type: ['REQUEST', entity.toUpperCase(), type.toUpperCase()].join('_'),
            payload: payload
        };
    }

    static receiveAction(entity, type, payload) {
        return {
            type: ['RECEIVE', entity.toUpperCase(), type.toUpperCase()].join('_'),
            payload: payload
        };
    }

    static errorAction(entity, type, payload) {
        return {
            type: ['ERROR', entity.toUpperCase(), type.toUpperCase()].join('_'),
            payload: payload
        };
    }

    static format(status, entity, type) {
        return [status.toUpperCase(), entity.toUpperCase(), type.toUpperCase()].join('_');
    }

}