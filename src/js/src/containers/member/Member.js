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

class Member extends Component {

    componentDidMount() {
        if (this.props.member.find.status === 0) {
            this.props.actions.findAll();
        }
    }

    render() {

        console.log(this.props);

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

                    <Table.Column width="62px">
                        <Table.Control.Button
                            condition={Table.Control.Condition.VisibleProp.not.bind('is_active')}
                            color="blue"
                            type="user.active"
                            icon="checkmark"
                            value={true}
                            onClick={this.onActiveNewUserButtonClick}></Table.Control.Button>

                        <Table.Control.Button
                            condition={Table.Control.Condition.VisibleProp.is.bind('is_active')}
                            color="orange"
                            type="user.ban"
                            icon="ban"
                            value={false}
                            onClick={this.onActiveNewUserButtonClick}></Table.Control.Button>
                    </Table.Column>

                    <Table.Column title="Name" width="300px">
                        <Table.Cell.Text field="name"></Table.Cell.Text>
                    </Table.Column>

                    <Table.Column title="Is active" width="50px">
                        <Table.Cell.Boolean field="is_active" />
                    </Table.Column>

                    <Table.Column title="Email">
                        <Table.Cell.Text field="email" />
                    </Table.Column>

                    <Table.Column width="100px">
                        <Table.Control.Button
                            condition={Table.Control.Condition.ActiveProp.is.bind('is_active')}
                            icon="write"
                            type="user.details"
                            onClick={this.onEditUserButtonClick}>Edit</Table.Control.Button>
                    </Table.Column>

                </Table>

                <Modal isFetching={this.props.member.get.status === 1}
                    isVisible={this.props.member.get.status > 0}
                    onClose={this.onUnloadUser}
                >
                    <Modal.Header>Modal Title</Modal.Header>
                    <Modal.Body>
                        <Form ref="userForm" dataset={this.props.member.get.dataset}>
                            <Form.Row title="User Name">
                                <Form.Input.Text name="user.name" />
                            </Form.Row>
                            <Form.Row title="User Email">
                                <Form.Input.Text name="user.email" />
                            </Form.Row>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input type="checkbox" tabIndex="0" className="hidden" />
                                    <label>I agree to the Terms and Conditions</label>
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={this.props.member.save.status === 1} position="left" color="negative" icon="trash">Delete</Button>
                        <Button onClick={this.onUnloadUser} icon="remove">Cancel</Button>
                        <Button loading={this.props.member.save.status === 1} onClick={this.onSaveUser} color="positive" icon="checkmark">Save</Button>
                    </Modal.Footer>
                </Modal>

            </Layout>
    )
    }
    /**
     * THIS IS SPARTA
     * @param element
     */
    onActiveNewUserButtonClick = (element) => {
        let data = {
            id: element.record.data.id
        };
        data.is_active = element.value;
        data.name = 'BANNED ' + Math.floor(Date.now() / 1000);
        this.props.actions.save(data, {
            type: element.type
        });
    }

    onUnloadUser = () => {
        this.props.actions.unload();
    }

    onSaveUser = (element) => {
        this.props.actions.save(this.refs.userForm.state);
    }

    onEditUserButtonClick = (button) => {
        console.log(button);
        this.props.actions.get(button.record.data.id);
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