import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from '../../actions/ActionFactory';
import CollectionAction from '../../actions/CollectionAction';
import UpdateAction from '../../actions/UpdateAction';
import DetailsAction from '../../actions/DetailsAction';
import Layout from '../Layout';
import Button from 'components/controls/Button';
import DataTable from 'components/data-table/DataTable';
import ModalDetails from 'components/modal/common/ModalDetails';
import Form from '../../components/form/Form'

class Classes extends Component {

    onCloseModal = () => {
        this.props.actions.details.unset();
    };

    onSaveModal = () => {};

    onDeleteModal = () => {};

    render() {
        console.log(this);

        return (
            <Layout title="Users Management" router={this.props.router}>
                <h2 className="ui header">
                    <i className="users icon" />
                    <div className="content">
                        Classes
                        <div className="sub header">Manage your guild members, roles and settings</div>
                    </div>
                </h2>

                <Button onClick={this.pressMeClick}>Press me</Button>

                <ModalDetails visible={this.props.member.details.status > 0} onClose={this.onCloseModal} onSave={this.onSaveModal} onDelete={this.onDeleteModal}>
                    <Form dataset={{}}>
                        <Form.Row title="User Name">
                            <Form.Input.Text name="user.name" />
                        </Form.Row>
                        <Form.Row title="User Email">
                            <Form.Input.Text name="user.email" />
                        </Form.Row>
                    </Form>
                </ModalDetails>

                <DataTable
                    dataset={this.props.member.collection.dataset}
                    status={this.props.member.collection.status}
                    join={this.props.member.collection.join}
                    pagination="default"
                >
                    <DataTable.Row onClick={this.onSelectTableRow}>
                        <DataTable.Column title="" width="40" field="id">
                            <DataTable.Cell.Default>
                                <DataTable.Controls.Checkbox />
                            </DataTable.Cell.Default>
                        </DataTable.Column>

                        <DataTable.Column title="ID" width="50" sortable="1" field="id">
                            <DataTable.Cell.Text />
                        </DataTable.Column>

                        <DataTable.Column title="User Name" width="300" field="name" sortable="1">
                            <DataTable.Cell.TextEdit onSave={this.onSaveMember} />
                        </DataTable.Column>

                        <DataTable.Column title="User Email" field="email" sortable="1">
                            <DataTable.Cell.TextEdit onSave={this.onSaveMember} />
                        </DataTable.Column>

                        <DataTable.Column title="Actions" width="300" field="password" sortable="1">
                            <DataTable.Cell.TextEdit onSave={this.onSaveMember} />
                        </DataTable.Column>

                        <DataTable.Column title="" width="85" field="id">
                            <DataTable.Cell.Default>
                                <Button onClick={this.onGetMemberDetails} icon="write" color="primary" size="mini" />
                                <Button icon="trash" color="negative" size="mini" />
                            </DataTable.Cell.Default>
                        </DataTable.Column>
                    </DataTable.Row>
                </DataTable>
            </Layout>
        )
    }

    onGetMemberDetails = (e, button) => {
        this.props.actions.details.get(button.props.record.id);
    }

    onSaveMember = (record, field, type) => {
        let data = {
            id: record.id
        }
        data[field] = record[field];
        this.props.actions.update.save(data, {
            field: field,
            type: type
        });
    }

    onSelectTableRow = (props) => {
        console.log('select row');
        console.log(props);
    }

    componentDidMount = () => {
        this.props.actions.collection.findAll();
    }

    pressMeClick = (e) => {
        this.props.actions.collection.findAll();
    }
}

function mapStateToProps(state) {
    return {
        member: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            collection: bindActionCreators(CollectionAction.create('member'), dispatch),
            update: bindActionCreators(UpdateAction.create('member'), dispatch),
            details: bindActionCreators(DetailsAction.create('member'), dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes)