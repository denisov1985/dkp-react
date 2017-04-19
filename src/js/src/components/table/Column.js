import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Column extends CoreComponent {
    render() {
        return this.props.children;
    }
}