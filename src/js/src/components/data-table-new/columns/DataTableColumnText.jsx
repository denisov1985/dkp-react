import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataTableColumnText extends CoreComponent {
    render() {
        return (<td>{this.props.children}</td>);
    }
}