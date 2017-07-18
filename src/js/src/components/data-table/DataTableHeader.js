import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataSorter from './addons/DataSorter';


export default class DataTableHeader extends CoreComponent {

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<thead>
            <tr>
                {this.props.columns.map((column, index) => this.renderHeader(column, index))}
            </tr>
        </thead>)
    }

    /**
     * Render column header
     * @param column
     */
    renderHeader(column, index) {
        return column.props.sortable ?  this.renderSortableHeader(column, index) : this.renderCommonHeader(column, index);
    }

    /**
     * Render sortable header
     * @param column
     * @returns {XML}
     */
    renderSortableHeader(column, index) {
        return (<DataSorter key={index} column={column} table={this.props.parent}>
            {this.renderCommonHeader(column, index)}
        </DataSorter>)
    }

    /**
     * Render common header
     * @param column
     * @returns {XML}
     */
    renderCommonHeader(column, index) {
        return (<th
            width={column.props.width || 'auto'}
            key={this.getKey(index)}>
            {column.props.title}
        </th>)
    }

}

