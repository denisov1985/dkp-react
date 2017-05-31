import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from '../../actions/ActionFactory';
import CollectionAction from '../../actions/CollectionAction';
import Layout from '../Layout';
import Button from 'components/button/Button';
import DataTable from 'components/data-table/DataTable';

class Classes extends Component {

    render() {
        return (
            <Layout title="Users Management" router={this.props.router}>
                <h2 className="ui header">
                    <i className="users icon"></i>
                    <div className="content">
                        Classes
                        <div className="sub header">Manage your guild members, roles and settings</div>
                    </div>
                </h2>

                <Button onClick={this.pressMeClick}>Press me</Button>

                <DataTable
                    dataset={this.props.member.collection.dataset}
                    status={this.props.member.collection.status}
                    pagination="default"
                >
                    <DataTable.Row onClick={this.onSelectTableRow}>
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
                    </DataTable.Row>
                </DataTable>
            </Layout>
        )
    }

    onSaveMember = (field, value) => {
        console.log(field, value);
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
            collection: bindActionCreators(CollectionAction.create('member'), dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes)