import Action from './Action';

class CollectionAction extends Action
{
    create() {
        return {
            findAll: (params) => this.getApi().sendGet('find', {}, params
                .delete('repository')
                .delete('status')
                .delete('dataset').toJS()
            ),
            unset: () => this.createReceiveAction('unset', {}),
        }
    }
}

export default CollectionAction;