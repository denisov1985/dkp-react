import React, {Component} from 'react'
import LoginForm from './forms/LoginForm';
import Container from '../common/Container';
import Background from 'components/view/Background';

class Login extends Container {

    componentWillMount() {
        this.props.actions.auth.initSession();
        if (this.props.auth.get('loggedIn')) {
            this.redirect('dashboard');
            return false;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.get('loggedIn')) {
            this.redirect('dashboard');
        }
    }

    render() {
        console.log(this);
        return (
            <Background>
                <div className="ui three column centered grid">
                    <div className="column center aligned" style={{position: 'fixed', top: '25%', maxWidth: '400px'}}>
                        <h2 className="ui teal image  header  center aligned">
                            <img src="/img/login.png" className="image"/>
                            <div className="content">
                                Log-in to your account
                            </div>
                        </h2>
                        <LoginForm
                            provider={this.props.auth}
                            handler={this.props.actions.auth.update}
                            onLogin={this.onLogin} />
                    </div>
                </div>
            </Background>
        )
    }

    onLogin = () => {
        console.log(this.props.auth);
        this.props.actions.auth.login(this.props.auth.get('dataset').toObject());
    }

}

export default Login.connect();