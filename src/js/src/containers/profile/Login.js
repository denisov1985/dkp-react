import React, {Component} from 'react'
import LoginForm from './forms/LoginForm';
import ActionFactory from 'actions/ActionFactory';
import Container from '../common/Container';

class Login extends Container {
    componentWillMount() {
        if (this.props.auth.loggedIn) {
            this.props.router.push('/dashboard');
            return false;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.loggedIn) {
            this.props.router.push('/dashboard');
        }
    }

    render() {
        return (
            <div style={{
                zIndex: 0,
                display: 'block',
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: '#DADADA'
            }}>
                <div className="ui three column centered grid">
                    <div className="column center aligned" style={{position: 'fixed', top: '25%'}}>
                        <h2 className="ui teal image  header  center aligned">
                            <img src="/img/login.png" className="image"/>
                            <div className="content">
                                Log-in to your account
                            </div>
                        </h2>
                        <LoginForm provider={this.props.auth} handler={this.props.actions.auth.update} onLogin={this.onLogin} />
                    </div>
                </div>
            </div>
        )
    }

    onLogin = () => {
        this.props.actions.auth.login(this.props.auth.dataset);
    }

    static mapStateToProps = (state, ownProps) => ({
        auth: state.auth
    })

    static mapDispatchToProps = (dispatch) => ({
        auth: ActionFactory.createAuthActions(dispatch)
    })
}

export default Login.connect();