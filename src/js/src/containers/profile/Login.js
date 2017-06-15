import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Link } from 'react-router';
import LoginForm from './forms/LoginForm';
import AuthAction from 'actions/AuthAction';

class Login extends Component {
    componentWillMount() {
        document.body.style.backgroundColor = "#DADADA";
    }

    componentWillReceiveProps(nextProps) {
        console.log('PROPS');
        console.log(nextProps.login.response.result);
        if (nextProps.login.response.result && nextProps.login.response.result.success) {
            window.sessionStorage.setItem('token', nextProps.login.response.result.token)
            this.props.router.push('/');
        }
    }

    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column center aligned" style={{position: 'fixed', top: '25%'}}>
                    <h2 className="ui teal image  header  center aligned">
                        <img src="/img/login.png" className="image"/>
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <LoginForm provider={this.props.login} handler={this.props.actions.auth.update} onLogin={this.onLogin} />
                </div>
            </div>
        )
    }

    onLogin = () => {
        console.log(this);
        console.log(this.props.actions.auth);
        this.props.actions.auth.login(this.props.login.dataset);
    }

}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        login: state.user.login
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