import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Layout from '../Layout';

class Dashboard extends Component {

    render() {
        return (
            <Layout router={this.props.router}>
                <h1>Under construction</h1>
            </Layout>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)