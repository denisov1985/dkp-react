import React, {Component} from 'react'
import Element from './Element';

export default class InputText extends Element {
    render() {
        return (<input type="text" onChange={this.onChange} name={this.getFieldName()} value={this.getValue()} />);
    }
}