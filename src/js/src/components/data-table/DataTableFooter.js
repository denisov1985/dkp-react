import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataPager from './addons/DataPager';

export default class DataTableFooter extends CoreComponent {
    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<tfoot>
        <tr>
            <th colSpan={this.props.columns.length}>
                {this.props.children}
            </th>
        </tr>
        </tfoot>)
    }
}

