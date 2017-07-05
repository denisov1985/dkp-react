import React, {Component} from 'react'
import { fromJS, Map, List } from 'immutable';
import CoreComponent from '../core/CoreComponent';
import InputText from './elements/InputText';
import Dropdown from './elements/dropdown/Dropdown';
import InputIconText from './elements/InputIconText';
import Row from './Row';
import FormWrapper from './FormWrapper';
import FormButton from './FormButton';
import FormError from './FormError';

export default class Form extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: fromJS({
                fields: this.props.provider.getIn(['dataset', 'attributes'])
            })
        };
    }

    render() {
        console.log('Form State');
        console.log('__________________________');
        console.log(this);
        return (<form  className="ui form">
            {this.renderElementWithProps({
                form: this,
                data: this.state.data,
            }, this.props.children)}
        </form>);
    }
}

Form.Row        = Row;
Form.Error      = FormError;
Form.Button     = FormButton;
Form.Wrapper    = FormWrapper;
Form.Input      = InputText;
Form.Dropdown   = Dropdown;
Form.Input.Text = InputText;
Form.Input.IconText = InputIconText;
