import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Table from '../../components/table/Table'
import Modal from '../../components/modal/Modal'
import Button from '../../components/button/Button'
import Column from '../../components/table/Column'
import TextCell from '../../components/table/cell/TextCell'

class Member extends Component {

    componentDidMount() {
        if (this.props.member.find.status === 0) {
            this.props.actions.findAll();
        }
    }

    render() {
        return (
            <Layout title="Users Management" router={this.props.router}>
                <h2 className="ui header">
                    <i className="users icon"></i>
                    <div className="content">
                        Members
                        <div className="sub header">Manage your guild members, roles and settings</div>
                    </div>
                </h2>

                <div className="ui secondary pointing menu">
                    <div className="right menu">
                        <a className="active item">
                            <i className="users icon"></i> Manage
                        </a>
                        <a className="item">
                            <i className="user icon"></i> Types
                        </a>
                        <a className="item">
                            <i className="edit icon"></i> Roles
                        </a>
                        <a className="item">
                            <i className="settings icon"></i> Settings
                        </a>
                    </div>
                </div>

                <button className="ui labeled icon button">
                    <i className="add user icon"></i>
                    Add member
                </button>

                <Table dataset={this.props.member.find.dataset} isFetchind={this.props.member.find.status === 1}>
                    <Column title="ID" width="50px">
                        <TextCell field="id"></TextCell>
                    </Column>

                    <Column title="Name" width="300px">
                        <TextCell field="name"></TextCell>
                    </Column>

                    <Column title="Email">
                        <TextCell field="email"></TextCell>
                    </Column>

                    <Column width="62px">
                        <Button onClick={this.onEditUserButtonClick}>Edit</Button>
                    </Column>
                </Table>

                <Modal isFetching={this.props.member.get.status === 1}
                    isVisible={this.props.member.get.status > 0}>
                </Modal>

            </Layout>
    )
    }

    onEditUserButtonClick = (button) => {
        this.props.actions.get(button.record.id);
    }
    }

    function mapStateToProps(state) {
        return {
            member: state.memberReducer
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            actions: bindActionCreators(ActionFactory.create('member'), dispatch)
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Member)