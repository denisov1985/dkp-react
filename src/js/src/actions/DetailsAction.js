import Action from './Action';

class DetailsAction extends Action
{
    create() {
        return {
            get: (id) => this.getApi().sendGet('get', {
                query: {
                    id: id
                }
            }),
            unset: () => this.createReceiveAction('unset', {}),
        }
    }
}

export default DetailsAction;