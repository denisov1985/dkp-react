import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Button extends CoreComponent {
    render() {
        return (<button onClick={this.onClick} className="ui icon button" type="button"><i className="edit icon"></i></button>)
    }
}