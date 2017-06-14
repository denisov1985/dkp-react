import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import InputText from './elements/InputText';
import Row from './Row';

export default class FormWrapper extends CoreComponent {

    render() {
        return (<this.props.tag  className={this.props.className}>
            {this.renderElementWithProps({
                form: this.props.form
            }, this.props.children)}
        </this.props.tag>);
    }
}