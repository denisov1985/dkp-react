import Action from './Action';

class CollectionAction extends Action
{
    create() {
        return {
            findAll: (params) => this.getApi().sendGet('find', {}, params),
            unset: () => this.createReceiveAction('unset', {}),
        }
    }
}

export default CollectionAction;