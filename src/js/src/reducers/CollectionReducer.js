import ActionHelper from '../actions/helpers/ActionHelper';
import CollectionHelper from '../utils/CollectionHelper';
import ReducerHelper from '../utils/ReducerHelper';
import ActionFactory from '../actions/ActionFactory';
import Reducer from './Reducer';
import { fromJS, Map, List } from 'immutable';

class CollectionReducer extends Reducer
{
    /**
     * Initial state
     */
    initState = () => ({
        dataset: [],
        test: []
    })

    /**
     * Create reducer
     * @returns {function(*=, *)}
     */
    create() {
        return (state = this.getInitialState(), action) => {
            let payload = fromJS(action.payload);
            switch (action.type) {
                /**
                 * Request login
                 */
                case this.formatRequestAction('find'):
                    return state.set('dataset', List([]))
                        .set('status', this.statusLoading())
                    break;

                /**
                 * Receive login
                 */
                case this.formatReceiveAction('find'):
                    return state.set('dataset', payload.get('data'))
                        .set('status', this.statusComplete())
                    break;
            }
            return state;
        }
    }
}

export default CollectionReducer;