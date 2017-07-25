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

    componentDidMount() {
        console.log('did mount');
        let id = this.props.routeParams.id;
        let data = this.props.product.collection.getIn(['repository', 'findBy'])(id);

        if (typeof data === 'undefined') {
            this.props.actions.product.details.get(id);
        } else {
            this.props.actions.product.details.set(data);
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
                                    <Form.Row title="Name">
                                        <Form.Input.Text name="name" />
                                    </Form.Row>
                                    <Form.Row title="Description">
                                        <Form.Input.Textarea name="description" />
                                    </Form.Row>
                                    <Form.Row title="Fulldescription">
                                        <Form.Input.Textarea name="fullDescription" />
                                    </Form.Row>
                                    <Form.Row title="Available">
                                        <Form.Input.Checkbox name="available" />
                                    </Form.Row>
                                    <Form.Row title="Price">
                                        <Form.Input.Number name="price" />
                                    </Form.Row>
                                    <Form.Row title="Saleprice">
                                        <Form.Input.Number name="salePrice" />
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