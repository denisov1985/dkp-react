import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Link } from 'react-router';
import LoginForm from './forms/LoginForm';
import AuthAction from 'actions/AuthAction';

class Logout extends Component {
    componentWillMount() {
        console.log(this.props.actions.auth.logout);
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
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            auth: bindActionCreators(AuthAction.create('auth'), dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)