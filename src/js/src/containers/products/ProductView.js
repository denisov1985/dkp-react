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

class ProductView extends Container {

    render() {
        console.log(this);
        return (
            <Layout loggedIn={this.isLoggedIn()} router={this.props.router}>
                <h2 className="ui header">
                    Просмотр продукта
                </h2>

                <div className="ui top attached tabular menu">
                    <a className="active item" >Информация</a>
                    <a className="item" >Аттрибуты</a>
                    <a className="item">Инвентаризация</a>
                    <a className="item">Сопутствующие товары</a>
                    <a className="item">Обзоры</a>
                    <a className="item">Закладки</a>
                    <a className="item">Подарочные сертификаты</a>
                    <a className="item">Вложения</a>
                </div>
                <div style={{height: 600 + 'px'}} className="ui bottom attached active tab segment">1A</div>

            </Layout>
        )
    }

    onView = (event, target) => {
        this.redirect('catalog/products/view/' + target.props.record.get('id'));
    }

    static mapStateToProps = (state, ownProps) => ({
        product: state.product,
    })

    static mapDispatchToProps = (dispatch) => ({
        product: ActionFactory.createCrudActions(dispatch, 'product')
    })

}

export default ProductView.connect();