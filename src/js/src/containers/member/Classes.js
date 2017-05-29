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
        console.log(this);
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
                        <DataTable.Column title="ID">
                            <DataTable.Cell.Text field="id" />
                        </DataTable.Column>

                        <DataTable.Column title="User Name" >
                            <DataTable.Cell.Text field="name" />
                        </DataTable.Column>

                        <DataTable.Column title="User Email">
                            <DataTable.Cell.Text field="email" />
                        </DataTable.Column>
                    </DataTable.Row>

                    <DataTable.Panel>

                    </DataTable.Panel>
                </DataTable>

            </Layout>
        )
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