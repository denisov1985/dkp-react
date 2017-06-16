import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Link } from 'react-router';
import LoginForm from './forms/LoginForm';
import AuthAction from 'actions/AuthAction';

class Login extends Component {
    componentWillMount() {
        if (this.props.auth.loggedIn) {
            this.props.router.push('/dashboard');
            return false;
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.auth.response.result);
        if (nextProps.auth.loggedIn) {
            document.body.style.backgroundColor = "#FFFFFF";
            this.props.router.push('/dashboard');
        }
    }

    render() {
        console.log(this);
        return (
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
        )
    }

    onLogin = () => {
        console.log(this);
        console.log(this.props.actions.auth);
        this.props.actions.auth.login(this.props.auth.dataset);
    }

}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            auth: bindActionCreators(AuthAction.create('user'), dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)