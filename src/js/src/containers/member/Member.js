import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Table from '../../components/table/Table'

class Member extends Component {

    componentDidMount() {
        console.log('DID MOUNT');
        console.log(this.props);
        this.props.actions.findAll();
        console.log('Dispatched');
    }
    
    render() {

        console.log('_________RENDER___________');
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

                <Table>

                </Table>

            </Layout>
        )
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