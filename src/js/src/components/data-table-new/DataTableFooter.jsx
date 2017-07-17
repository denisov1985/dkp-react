import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataTablePager from './addons/DataTablePager';

export default class DataTableFooter extends CoreComponent {
    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<tfoot>
            <tr>
                <th colSpan={this.props.parent.getColumns().length}>
                    <DataTablePager parent={this.props.parent} />
                </th>
            </tr>
        </tfoot>)
    }
}

