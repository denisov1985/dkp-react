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
                    <LoginForm dataset={this.props.login.dataset} handler={this.props.actions.login.update} onLogin={this.onLogin} />
                </div>
            </div>
        )
    }

    onLogin = () => {
        console.log(this);
    }

}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        login: state.users.details
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            login: bindActionCreators(AuthAction.create('member'), dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)