import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import DataTable from 'components/data-table-new/DataTable';
import Segment from 'components/segment/Segment';
import Button from 'components/button/Button';
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Container from '../common/Container';

class Category extends Container {

    componentWillMount() {
        super.componentWillMount();
        if (this.props.category.collection.get('status') === 0) {
            this.props.actions.category.collection.findAll({
                page: {
                    offset: 1,
                    limit: 7
                }
            });
        }
    }

    render() {
        console.log(this);
        return (
            <Layout description="Список категорий продуктов" container={this}>

                <Segment>
                    <div className="ui action input fluid">
                        <input  type="text" placeholder="Search..." />
                            <button className="ui icon button">
                                <i className="search icon"></i>
                            </button>
                    </div>

                    <div style={{marginTop: 12 + 'px'}}>
                        <a className="ui teal label">
                            Продукты активные
                            <i className="delete icon"></i>
                        </a>

                        <a className="ui teal label">
                            Есть интерес
                            <i className="delete icon"></i>
                        </a>
                    </div>


                </Segment>

                <Button>Добавить продукт</Button>

                <div style={{height: 12 + 'px'}}></div>

                <DataTable provider={this.props.category.collection} source={this.props.actions.category.collection}>
                    <DataTable.Column.Data width="40" title="ID" field="id" sortable={true} />
                    <DataTable.Column.Data title="Category Name" field="name"  sortable={true}/>
                    <DataTable.Column.Text title="Static">
                        Some text
                    </DataTable.Column.Text>

                    <DataTable.Column.Control width="100" title="Действия">
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