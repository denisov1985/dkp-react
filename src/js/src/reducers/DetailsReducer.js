import Reducer from './Reducer';
import { fromJS, Map, List } from 'immutable';

class DetailsReducer extends Reducer
{
    create() {
        return (state = this.getInitialState(), action) => {
            let payload = fromJS(action.payload);
            console.log(action);
            switch (action.type) {
                /**
                 * Request login
                 */
                case this.formatRequestAction('get'):
                    return state.set('dataset', Map([]))
                        .set('status', this.statusLoading())
                    break;

                /**
                 * Receive login
                 */
                case this.formatReceiveAction('get'):
                    return state.set('dataset', payload.get('data'))
                        .set('status', this.statusComplete())
                    break;

                /**
                 * Receive login
                 */
                case this.formatReceiveAction('unset'):
                    return state.set('dataset', payload.get('data'))
                        .set('status', this.statusEmpty())
                    break;
            }
            return state;
        }
    }
}

export default DetailsReducer;