import Reducer from './Reducer';
import { fromJS, Map, List } from 'immutable';

class CollectionReducer extends Reducer
{
    /**
     * Initial state
     */
    initState = () => ({
        dataset: [],
        page: {
            offset: 0,
            limit:  0,
            total:  0
        },
        sort: {
            field: null,
            order: 'asc'
        },
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
                    return state.set('status', this.statusLoading())
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

                    return state.set('dataset', payload.get('data'))
                        .set('status', this.statusComplete())
                        .set('page', payload.get('page'))
                        .set('sort', payload.get('sort'))
                        .set('repository', repository);

                    break;
            }
            return state;
        }
    }
}

export default CollectionReducer;