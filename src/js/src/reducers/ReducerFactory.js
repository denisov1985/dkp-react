import ActionHelper from '../utils/ActionHelper';

class ReducerFactory
{
    create(entity) {
        return function(state = {}, action) {
            switch (action.type) {
                case ActionHelper.format('request', entity, 'find'):
                    console.log(action);
                    break;
            }
            return state;
        }
    }
}

export default new ReducerFactory();