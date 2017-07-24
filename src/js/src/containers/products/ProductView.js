import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Container from '../common/Container';
import Form from 'components/form/Form';
import ProductTabs from './blocks/ProductTabs';

import ModalDetails from 'components/modal/common/ModalDetails';

class ProductView extends Container {

    componentWillMount() {
        super.componentWillMount();
        if (this.props.product.collection.get('status') === 0) {
            // /this.props.actions.product.collection.findAll();
            let id = this.props.routeParams.id;
            console.log('THIS');
            console.log(this);
            let data = this.props.product.collection.getIn(['repository', 'findBy'])(id);
            if (typeof data === 'undefined') {
                this.props.actions.product.details.get(id);
            } else {
                this.props.actions.product.details.set(data);
            }

        }
    }

    render() {
        return (
            <Layout container={this}>
                <h2 className="ui header">
                    Просмотр продукта123
                </h2>

                <ProductTabs id={this.props.routeParams.id}/>
                <div className="ui bottom attached active tab segment">

                    <div style={{
                        maxWidth: 970 + 'px'
                    }}>

                            <div className="ui secondary raised segment">
                                <h4 className="ui dividing header">Информация</h4>
                                <Form provider={this.props.product.details} handler={this.props.actions.product.details.update} className="ui form">
                                    <Form.Row title="Lalala">
                                        <Form.Input.Text name="productname"/>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Input.Text name="productprice"/>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Input.Text name="productsalePrice"/>
                                    </Form.Row>
                                </Form>
                            </div>
                            <div className="ui button">Submit Order</div>

                    </div>


                </div>

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