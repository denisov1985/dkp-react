import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from '../../actions/ActionFactory';
import CollectionAction from '../../actions/CollectionAction';
import Layout from '../Layout';
import Button from 'components/button/Button';
import Table from 'components/table/Table';

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

                <Table dataset={this.props.member.collection.dataset}
                    isFetchind={this.props.member.collection.status === 1}>


                    <Table.Column title="ID" width="50px">
                        <Table.Cell.Text field="id" />
                    </Table.Column>

                    <Table.Column title="Name">
                        <Table.Cell.Text field="name" />
                    </Table.Column>

                </Table>

            </Layout>
        )
    }

    pressMeClick = (e) => {
        this.props.actions.findAll();
    }
}

function mapStateToProps(state) {
    return {
        member: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(CollectionAction.create('member'), dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes)