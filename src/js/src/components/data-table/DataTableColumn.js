import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableColumn extends CoreComponent {
    render() {
        return this.props.children;
    }
}