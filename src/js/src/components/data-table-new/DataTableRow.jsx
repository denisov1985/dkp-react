import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableRow extends CoreComponent {
    render() {
        return (<tr>{this.props.children}</tr>);
    }
}