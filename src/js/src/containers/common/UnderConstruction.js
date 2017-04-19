import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Layout from '../Layout';

class UnderConstruction extends Component {
    render() {
        return (
            <Layout title="Under construction" router={this.props.router}>
                <h2 className="ui header">
                    <i className="settings icon"></i>
                    <div className="content">
                        Under construction
                        <div className="sub header">This page currently is under construction</div>
                    </div>
                </h2>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UnderConstruction)