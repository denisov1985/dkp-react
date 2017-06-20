import Action from './Action';

class CollectionAction extends Action
{
    create() {
        return {
            findAll: () => this.getApi().sendGet('find', {}),
            unset: () => this.createReceiveAction('unset', {}),
        }
    }
}

export default CollectionAction;