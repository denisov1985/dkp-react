import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import DataTable from 'components/data-table-new/DataTable';
import Button from 'components/controls/Button';
import CollectionAction from '../../actions/CollectionAction';
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Container from '../common/Container';
import Form from 'components/form/Form';
import Search from 'components/search/Search';

import ModalDetails from 'components/modal/common/ModalDetails';

class Products extends Container {

    componentWillMount() {
        super.componentWillMount();
        if (this.props.product.collection.get('status') === 0) {
            this.props.actions.product.collection.findAll(this.props.product.collection);
        }
    }

    onSearch = (data) => {
        let filter = data.map((item, index) => {
            return {
                field: item.field.key,
                operator: item.operator.key,
                value: item.value.key,
            }
        });


        this.props.actions.product.collection.findAll(
            this.props.product.collection.set('filter', filter)
        );
    }

    formatOptions = () => {
        return [
            {key: 'id', value: 'Индекс'},
            {key: 'name', value: 'Модель авто'},
        ];
    }

    render() {
        let data = this.props.product.collection.getIn(['repository', 'findBy'])(29999);
        console.log(data);

        return (
            <Layout container={this}>
                <h2 className="ui header">
                    Продукты
                    <div className="sub header">Список продуктов на складе</div>
                </h2>

                <Search options={this.formatOptions()} onSearch={this.onSearch} />

                <DataTable provider={this.props.product.collection} source={this.props.actions.product.collection}>
                    <DataTable.Column.Data width="40" title="ID" field="id" sortable={true}/>
                    <DataTable.Column.Data title="Product Name" field="name" sortable={true}/>
                    <DataTable.Column.Text title="Static">
                        Some text
                    </DataTable.Column.Text>

                    <DataTable.Column.Control width="100" title="Действия">
                        <DataTable.Controls.Button fluid onClick={this.onView}>Просмотр</DataTable.Controls.Button>
                    </DataTable.Column.Control>
                </DataTable>
            </Layout>
        )
    }

    onView = (event, target) => {
        //this.props.actions.product.details.getLocal(target.props.record);
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