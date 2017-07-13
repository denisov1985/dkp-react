import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Layout from '../Layout';

class Dashboard extends Component {

    render() {
        console.log(this);
        return (
            <Layout loggedIn={this.props.auth.loggedIn} router={this.props.router}>
                <h1>Under construction</h1>
            </Layout>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)