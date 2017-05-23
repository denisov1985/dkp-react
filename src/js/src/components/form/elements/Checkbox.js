import React, {Component} from 'react'
import Element from './Element';

export default class Checkbox extends Element {
    render() {
        return (<div className="ui checkbox checked">
            <input onChange={this.onChange} type="checkbox" className="hidden" checked="checked" />
            <label>{this.props.children}</label>
        </div>);
    }
}