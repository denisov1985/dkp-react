import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Icon extends CoreComponent {

    buildClass() {
        this.addClass('icon');
        this.addClass(this.getProp('icon'));
    }

    render() {
        return (<i className={this.getClass()} onClick={this.props.onClick}/>);
    }
}