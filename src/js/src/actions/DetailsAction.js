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
             * Get local
             * @param id
             */
            getLocal: (record) => this.createReceiveAction('get_local', record),

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