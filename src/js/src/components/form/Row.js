import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Loader from '../loader/Loader';
import InputText from './elements/InputText';

export default class Form extends CoreComponent {

    render() {
        return (<div className="field">
            <label>{this.getProp('title')}</label>
            {this.renderElementWithProps({
                form: this.props.form
            }, this.props.children)}
        </div>);
    }
}