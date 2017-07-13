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

class Products extends Container {

    componentWillMount() {
        super.componentWillMount();
        if (this.props.product.collection.get('status') === 0) {
            this.props.actions.product.collection.findAll();
        }
    }

    render() {
        console.log(this);
        return (
            <Layout loggedIn={this.isLoggedIn()} router={this.props.router}>
                <h2 className="ui header">
                    Продукты
                    <div className="sub header">Список продуктов на складе</div>
                </h2>

                <DataTable
                    dataset={this.props.product.collection.get('dataset')}
                    status={this.props.product.collection.get('status')}
                    join={this.props.product.collection.get('join')}
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

                        <DataTable.Column sortType="date" title="Product Name" field="name" sortable="1">
                            <DataTable.Cell.Text  />
                        </DataTable.Column>

                        <DataTable.Column width="80"  title="Price" field="price" sortable="1">
                            <DataTable.Cell.Text  />
                        </DataTable.Column>

                        <DataTable.Column title="" width="180" field="id">
                            <DataTable.Cell.Default>
                                <Button onClick={this.onView} icon="write" size="mini" shiftRight="5">Просмотр</Button>
                                <Button icon="trash" color="negative" size="mini"/>
                            </DataTable.Cell.Default>
                        </DataTable.Column>
                    </DataTable.Row>
                </DataTable>
            </Layout>
        )
    }

    onView = (event, target) => {
        console.log(target);
        this.props.actions.product.details.getLocal(target.props.record);
        this.redirect('catalog/products/view/' + target.props.record.get('id'));
    }

    static mapStateToProps = (state, ownProps) => ({
        product: state.product,
    })

    static mapDispatchToProps = (dispatch) => ({
        product: ActionFactory.createCrudActions(dispatch, 'product')
    })

}

export default Products.connect();