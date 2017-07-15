import Reducer from './Reducer';
import { fromJS, Map, List } from 'immutable';

class CollectionReducer extends Reducer
{
    /**
     * Initial state
     */
    initState = () => ({
        dataset: [],
        test: [],
        repository: {
            findBy: (id) => null
        }
    });

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
                    const dataset = payload.get('data');
                    let repository = state.get('repository');
                    repository = repository.set('findBy', (id) => {
                        let data = dataset.filter((record) => {
                            return record.get('id') == id;
                        });
                        return data.get(0);
                    });

                    console.log('rep');
                    console.log(repository);

                    return state.set('dataset', payload.get('data'))
                        .set('status', this.statusComplete())
                        .set('repository', repository);

                    break;
            }
            return state;
        }
    }
}

export default CollectionReducer;