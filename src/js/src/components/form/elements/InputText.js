import React, {Component} from 'react'
import Element from './Element';

export default class InputText extends Element {
    render() {
        return (<input
            onBlur={this.onBlur}
            placeholder={this.getProp('placeholder', '')}
            type="text"
            onChange={this.onChange}
            name={this.getFieldName()}
            value={this.state.value} />);
    }
}