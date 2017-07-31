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
            console.log(action.type);
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
                    console.log(payload);
                    return state.set('dataset', payload.get('data'))
                        .set('status', this.statusComplete())
                    break;

                /**
                 * Receive login
                 */
                case this.formatReceiveAction('set'):
                    return state.set('dataset', payload)
                        .set('status', this.statusComplete())
                    break;

                /**
                 * Request upload image
                 */
                case this.formatRequestAction('upload_image'):
                    if (typeof action.payload === 'undefined') {
                        return state;
                    }
                    return state
                        .set('status', this.statusLoading())
                    break;

                /**
                 * Receive upload image
                 */
                case this.formatReceiveAction('upload_image'):
                    if (typeof action.payload === 'undefined') {
                        return state;
                    }
                    let entity = payload.getIn(['data', 'type']) + 's';
                    entity = entity.toLowerCase();
                    const images = state.getIn(['dataset', 'attributes', entity]).push(payload.getIn(['data', 'attributes']));
                    console.log('RECEIIIVE');
                    console.log(images);
                    console.log(payload);
                    return state
                        .set('status', this.statusComplete())
                        .setIn(['dataset', 'attributes', 'images'], images)
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