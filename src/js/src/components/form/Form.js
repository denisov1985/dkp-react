import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import InputText from './elements/InputText';
import Dropdown from './elements/Dropdown';
import InputIconText from './elements/InputIconText';
import Row from './Row';
import FormWrapper from './FormWrapper';
import FormButton from './FormButton';
import FormError from './FormError';

export default class Form extends CoreComponent {

    render() {
        return (<form  className="ui form">
            {this.renderElementWithProps({
                form: this
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
