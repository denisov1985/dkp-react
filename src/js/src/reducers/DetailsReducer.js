import Reducer from './Reducer';
import { fromJS, Map, List } from 'immutable';

class DetailsReducer extends Reducer
{
    /**
     * Initial state
     */
    initState = () => ({
        form: {
            fields: {}
        },
    })

    create() {
        return (state = this.getInitialState(), action) => {
            let payload = fromJS(action.payload);
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
                 *
                 */
                case this.formatReceiveAction('unset'):
                    return state.set('dataset', payload.get('data'))
                        .set('status', this.statusEmpty())
                    break;

                /**
                 * Update details
                 */
                case this.formatReceiveAction('update'):
                    return state.updateIn(['dataset', 'attributes'], attributes => attributes.set(action.payload.field, action.payload.value))
                    break;
            }
            return state;
        }
    }
}

export default DetailsReducer;