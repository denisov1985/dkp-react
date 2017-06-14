import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


class Register extends Component {
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
                            Create new account
                        </div>
                    </h2>
                    <form className="ui form">
                        <div className="ui teal segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"/>
                                    <input type="text" name="email" placeholder="E-mail address"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"/>
                                    <input type="password" name="password" placeholder="Password"/>
                                </div>
                            </div>
                            <div className="ui fluid large teal submit button">Register</div>
                        </div>
                        <div className="ui error message"/>

                        <div className="ui message">
                            New to us? <a href="#">Sign Up</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)