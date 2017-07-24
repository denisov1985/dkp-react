import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Container from '../common/Container';
import Form from 'components/form/Form';
import ProductTabs from './blocks/ProductTabs';

import ModalDetails from 'components/modal/common/ModalDetails';

class ProductDev extends Container {

    render() {
        return (
            <Layout container={this}>
                <h2 className="ui header">
                    Просмотр продукта123
                </h2>

                <ProductTabs id={this.props.routeParams.id} />
                <div className="ui bottom attached active tab segment">
                    In development
                </div>

            </Layout>
        )
    }
}

export default ProductDev.connect();