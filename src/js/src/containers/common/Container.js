import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Layout from '../Layout';

class Container extends Component {

    render() {
        return (
            <h1>Under construction</h1>
        )
    }

    static mapProps(state) {
        return {}
    }

    static mapStateToProps(state, ownProps) {
        return {};
    }

    static mapDispatchToProps(dispatch) {
        return {}
    }

    static connect(ClassName) {
        return connect(ClassName.mapStateToProps, ClassName.mapDispatchToProps)(ClassName)
    }
}

export default Container;