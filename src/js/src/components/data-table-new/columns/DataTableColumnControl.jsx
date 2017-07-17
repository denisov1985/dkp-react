import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataTableColumnControl extends CoreComponent {
    render() {
        return (<td>
            {this.renderElementWithProps({
                record: this.props.record
            }, this.props.children)}
        </td>);
    }
}