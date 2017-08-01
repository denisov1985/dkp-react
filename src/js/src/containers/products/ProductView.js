import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import ActionFactory from '../../actions/ActionFactory';
import Layout from '../Layout';
import Container from '../common/Container';
import Form from 'components/form/Form';
import Loader from 'components/loader/Loader';
import ProductTabs from './blocks/ProductTabs';

import ModalDetails from 'components/modal/common/ModalDetails';

class ProductView extends Container {

    componentWillMount() {
        console.log('will mount');
        super.componentWillMount();
        let id = this.props.routeParams.id;
        this.props.actions.product.details.get(id);
    }

    componentWillUnmount() {
        console.log('unmount');
        this.props.actions.product.details.unset();
    }


    renderMain = () => {
        return(<div>

            <div className="ui  raised segment">
                <h4 className="ui dividing header">Информация</h4>
                <Form
                    upload={this.props.actions.product.details.upload}
                    provider={this.props.product.details}
                    handler={this.props.actions.product.details.update}
                    className="ui form">
                    <Form.Row title="Name">
                        <Form.Input.Text name="name" />
                    </Form.Row>

                    <Form.Row title="Images">
                        <Form.Input.Image name="images" />
                    </Form.Row>

                    <Form.Row title="Description">
                        <Form.Input.Textarea name="description" />
                    </Form.Row>

                    <Form.Row title="Available">
                        <Form.Input.Checkbox name="available" />
                    </Form.Row>
                    <Form.Row title="Price">
                        <Form.Input.Number name="price" />
                    </Form.Row>
                    <Form.Row title="Saleprice">
                        <Form.Input.Number name="sale_price" />
                    </Form.Row>
                </Form>
            </div>

            <div onClick={this.onSave} className="ui button">Сохранить</div>

        </div>)
    }

    renderLoading = () => {
        return(<div style={{height: 200 + 'px'}}>
            <Loader inverted visible={true} />
        </div>)
    }

    render() {
        console.log('LALALLA');
        console.log(this);
        return (
            <Layout container={this}>
                <ProductTabs id={this.props.routeParams.id}/>
                <div className="ui bottom attached active tab segment">
                    {this.props.product.details.get('status') == '2' ? this.renderMain() : this.renderLoading()}
                </div>

            </Layout>
        )
    }

    onSave = () => {
        this.props.actions.product.details.save(this.props.product.details);
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