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

class Member extends Component {



    render() {

        console.log(this);

        return (
            <Layout title="Users Management" router={this.props.router}>
                <h2 className="ui header">
                    <i className="users icon"></i>
                    <div className="content">
                        Members
                        <div className="sub header">Manage your guild members, roles and settings</div>
                    </div>
                </h2>



            </Layout>
        )}


    }

    function mapStateToProps(state) {
        return {
            member: state.memberReducer
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            actions: bindActionCreators(ActionFactory.create('member'), dispatch),
            actions2: bindActionCreators(ActionFactory.create('some'), dispatch)
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Member)