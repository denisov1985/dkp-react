import Action from './Action';

class DetailsAction extends Action
{
    create() {
        return {
            /**
             * Get entity resource
             * @param id
             */
            get: (id) => this.getApi().sendGet('get', {
                query: {
                    id: id
                }
            }),

            /**
             * Save record
              * @param record
             */
            save: (record) => this.getApi().sendPost('save', record.getIn(['dataset', 'attributes']).toObject()),

            /**
             * Get local
             * @param record
             */
            set: (record) => this.createReceiveAction('set', record),

            /**
             * Unset entity resource
             */
            unset: () => this.createReceiveAction('unset', {}),

            /**
             * Update entity resource
             * @param field
             * @param value
             */
            update: (field, value) => this.createReceiveAction('update', {
                field: field,
                value: value
            }),
        }
    }
}

export default DetailsAction;