import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import DataTable from 'components/data-table-new/DataTable';
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Container from '../common/Container';

class Category extends Container {

    componentWillMount() {
        super.componentWillMount();
        if (this.props.category.collection.get('status') === 0) {
            this.props.actions.category.collection.findAll();
        }
    }

    render() {
        return (
            <Layout description="Список категорий продуктов" container={this}>
                <DataTable provider={this.props.category.collection}>
                    <DataTable.Column.Data width="40" title="ID" field="id"/>
                    <DataTable.Column.Data title="Category Name" field="name"/>
                    <DataTable.Column.Text title="Static">
                        Some text
                    </DataTable.Column.Text>

                    <DataTable.Column.Control width="100" title="Static">
                        <DataTable.Controls.Button fluid >Просмотр</DataTable.Controls.Button>
                    </DataTable.Column.Control>
                </DataTable>

            </Layout>
        )
    }

    static getEntity() {
        return 'Category';
    }

}

export default Category.connect();