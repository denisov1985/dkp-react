import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Table from '../../components/table/Table'
import Modal from '../../components/modal/Modal'
import Form from '../../components/form/Form'
import Button from '../../components/button/Button'
import SaveButton from '../../components/button/SaveButton'
import BanButton from './elements/button/BanButton';
import ActiveButton from './elements/button/ActiveButton';
import ClassProp from '../../components/condition/ClassProp';

class Types extends Component {

    componentDidMount() {}

    render() {
        return (
            <Layout title="Users Management" router={this.props.router}>
                Some data
            </Layout>
        )}
    }

mapStateToProps = (state) => {
    return {
        member: state.memberReducer
    }
};

mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ActionFactory.create('member'), dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Types)