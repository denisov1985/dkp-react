import React, {Component} from 'react'
import ActionFactory from 'actions/ActionFactory';
import Container from '../common/Container';

class Logout extends Container {
    componentWillMount() {
        this.props.actions.auth.logout();
        this.props.router.push('/login');
        return false;
    }

    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column center aligned" style={{position: 'fixed', top: '25%'}}>
                    Вы вышли
                </div>
            </div>
        )
    }

    static mapStateToProps = (state, ownProps) => ({
        auth: state.auth
    })

    static mapDispatchToProps = (dispatch) => ({
        auth: ActionFactory.createAuthActions(dispatch)
    })
}

export default Logout.connect();