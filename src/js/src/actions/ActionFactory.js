import ActionHelper from '../utils/ActionHelper';

class ActionFactory
{
    create(entity) {
        return {
            test() {
                return (dispatch, getState) => {
                    dispatch(ActionHelper.requestAction(entity, 'find', 'lalalal123'))
                }
            },

            findAll() {
                return (dispatch, getState) => {
                    dispatch(dispatch(ActionHelper.requestAction(entity, 'find', {})));
                    return fetch('/api/' + entity.replace('_', '/'))
                        .then(response  => response.json())
                        .then(payload   => dispatch(ActionHelper.receiveAction(entity, 'find', payload)))
                        .catch(payload => dispatch(ActionHelper.errorAction(entity, 'find', payload)));
                }
            },
        }
    }
}

ActionFactory.STATUS_EMPTY    = 0;
ActionFactory.STATUS_FETCHING = 1;
ActionFactory.STATUS_COMPLETE = 2;
ActionFactory.STATUS_ERROR    = 3;

export default new ActionFactory();