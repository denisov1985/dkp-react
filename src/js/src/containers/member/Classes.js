import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from '../../actions/ActionFactory';
import CollectionAction from '../../actions/CollectionAction';
import UpdateAction from '../../actions/UpdateAction';
import Layout from '../Layout';
import Button from 'components/controls/Button';
import DataTable from 'components/data-table/DataTable';
import ReducerHelper from '../../utils/ReducerHelper';
import Checkbox from 'components/controls/Checkbox';
import Modal from 'components/modal/Modal';

class Classes extends Component {

    render() {
        console.log('Re-render main');
        console.log(DataTable.Controls);

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

                <Modal visible={true}>
                    <Modal.Header>Ololo</Modal.Header>
                    <Modal.Body >
                        lalala
                    </Modal.Body>
                    <Modal.Footer>
                        <Button position="left" color="negative" icon="trash">Delete</Button>
                        <Button icon="remove">Cancel</Button>
                        <Button color="positive" icon="checkmark">Save</Button>
                    </Modal.Footer>
                </Modal>

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
                                <Button icon="write" color="primary" size="mini" />
                                <Button icon="trash" color="negative" size="mini" />
                            </DataTable.Cell.Default>
                        </DataTable.Column>
                    </DataTable.Row>
                </DataTable>



            </Layout>
        )
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
            update: bindActionCreators(UpdateAction.create('member'), dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes)