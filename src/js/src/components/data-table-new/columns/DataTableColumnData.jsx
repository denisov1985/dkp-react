import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataTableColumnData extends CoreComponent {
    render() {
        return (<td>
            {this.props.record.getIn(['attributes', this.props.field])}
        </td>);
    }
}