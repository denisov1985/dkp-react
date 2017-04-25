import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Table from '../../components/table/Table'
import Modal from '../../components/modal/Modal'
import Button from '../../components/button/Button'

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
                    <Table.Column title="ID" width="50px">
                        <Table.Cell.Text field="id"></Table.Cell.Text>
                    </Table.Column>

                    <Table.Column title="Name" width="300px">
                        <Table.Cell.Text field="name"></Table.Cell.Text>
                    </Table.Column>

                    <Table.Column title="Email">
                        <Table.Cell.Text field="email"></Table.Cell.Text>
                    </Table.Column>

                    <Table.Column width="120px">
                        <Button size="small" icon="edit" onClick={this.onEditUserButtonClick}>Edit</Button>
                    </Table.Column>
                </Table>

                <Modal isFetching={this.props.member.get.status === 1}
                    isVisible={this.props.member.get.status > 0}>
                    <Modal.Header>Modal Title</Modal.Header>
                    <Modal.Body>
                        <form className="ui form">
                            <div className="field">
                                <label>First Name</label>
                                <input type="text" name="first-name" placeholder="First Name" />
                            </div>
                            <div className="field">
                                <label>Last Name</label>
                                <input type="text" name="last-name" placeholder="Last Name" />
                            </div>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input type="checkbox" tabIndex="0" className="hidden" />
                                    <label>I agree to the Terms and Conditions</label>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button position="left" color="negative" icon="trash">Delete</Button>
                        <Button icon="remove">Cancel</Button>
                        <Button color="positive" icon="checkmark">Save</Button>
                    </Modal.Footer>
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