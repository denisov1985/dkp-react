import {bindActionCreators} from 'redux'
import ActionHelper from '../utils/ActionHelper';
import AuthAction from './AuthAction';
import CollectionAction from './CollectionAction';
import DeleteAction from './DeleteAction';
import DetailsAction from './DetailsAction';
import UpdateAction from './UpdateAction';

class ActionFactory
{

    constructor() {
        this.STATUS_EMPTY    = 0;
        this.STATUS_FETCHING = 1;
        this.STATUS_COMPLETE = 2;
        this.STATUS_ERROR    = 3;
    }

    /**
     * Create auth action
     * @param dispatch
     * @returns {auth|B|N}
     */
    createAuthActions(dispatch) {
        return bindActionCreators(new AuthAction('auth').create(), dispatch)
    }

    createCrudActions(dispatch, entity) {
        return {
            collection: bindActionCreators(new CollectionAction(entity).create(), dispatch),
            details: bindActionCreators(new DetailsAction(entity).create(), dispatch),
        }
    }
}

export default new ActionFactory();