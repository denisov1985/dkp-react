import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import DataTable from 'components/data-table/DataTable';
import Button from 'components/controls/Button';
import CollectionAction from '../../actions/CollectionAction';
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Container from '../common/Container';
import Form from 'components/form/Form';

import ModalDetails from 'components/modal/common/ModalDetails';
;

class Dashboard extends Container {

    componentWillUnmount() {
        this.props.actions.collection.unset();
    }

    render() {
        console.log(this);
        return (
            <Layout loggedIn={this.isLoggedIn()} router={this.props.router}>
                <h2 className="ui header">
                    Account Settings
                    <div className="sub header">Manage your account settings and set e-mail preferences.</div>
                </h2>

                <Button onClick={this.onRefreshClick}>Refresh</Button><span className="margin-left-5"></span>

                <ModalDetails onClose={this.onCloseDetails} provider={this.props.user}>
                    <Form provider={this.props.user.details} handler={this.props.actions.details.update} className="ui form">
                        <Form.Row title="First Name">
                            <Form.Input.Text name="first_name" />
                        </Form.Row>
                        <Form.Row title="Last Name">
                            <Form.Input.Text name="last_name" />
                        </Form.Row>
                        <Form.Row title="Email">
                            <Form.Input.Text name="email" />
                        </Form.Row>

                        <Form.Row title="Region">
                            <Form.Dropdown name="region" field="region.id" />
                        </Form.Row>

                        <Form.Row title="City">
                            <Form.Dropdown refColumn="region_id" name="city" field="city.id" />
                        </Form.Row>
                        <div className="ui segment">
                            <div className="field error">
                                <div className="ui toggle checkbox checked">
                                    <input type="checkbox" name="gift" tabIndex="0" className="hidden" checked={true} />
                                        <label>Check to activate user</label>
                                </div>
                            </div>
                        </div>

                    </Form>
                </ModalDetails>

                <DataTable
                    dataset={this.props.user.collection.get('dataset')}
                    status={this.props.user.collection.get('status')}
                    join={this.props.user.collection.get('join')}
                    pagination="default"
                >
                    <DataTable.Row>
                        <DataTable.Column title="" width="40" field="id">
                            <DataTable.Cell.Default>
                                <DataTable.Controls.Checkbox />
                            </DataTable.Cell.Default>
                        </DataTable.Column>

                        <DataTable.Column title="ID" width="50" sortable="1" field="id">
                            <DataTable.Cell.Text />
                        </DataTable.Column>

                        <DataTable.Column sortType="date" title="User Name" width="300" field="first_name" sortable="1">
                            <DataTable.Cell.Text  />
                        </DataTable.Column>

                        <DataTable.Column sortType="date" title="User Name" width="300" field="last_name" sortable="1">
                            <DataTable.Cell.Text  />
                        </DataTable.Column>

                        <DataTable.Column title="User Email" field="email" sortable="1">
                            <DataTable.Cell.Text  />
                        </DataTable.Column>

                        <DataTable.Column title="" width="88" field="id">
                            <DataTable.Cell.Default>
                                <Button onClick={this.onGetUserDetails} icon="write" size="mini" shiftRight="5"/>
                                <Button icon="trash" color="negative" size="mini"/>
                            </DataTable.Cell.Default>
                        </DataTable.Column>
                    </DataTable.Row>
                </DataTable>
            </Layout>
        )
    }

    componentWillMount() {
        super.componentWillMount();
        this.props.actions.collection.findAll();
    }

    onRefreshClick = () => {
        this.props.actions.collection.findAll();
    }

    onGetUserDetails = (event, target) => {
        console.log(target);
        this.props.actions.details.get(
            target.props.record.getIn(['attributes', 'id'])
        )
    }

    onCloseDetails = (event, target) => {
        this.props.actions.details.unset()
    }

    static mapStateToProps = (state, ownProps) => ({
        user: state.user,
    })

    static mapDispatchToProps = (dispatch) => ActionFactory.createCrudActions(dispatch, 'user')
}

export default Dashboard.connect();