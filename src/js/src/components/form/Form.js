import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import InputText from './elements/InputText';
import Row from './Row';

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
Form.Input      = InputText;
Form.Input.Text = InputText;
