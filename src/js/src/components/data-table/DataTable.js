import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import DataTableColumn from './DataTableColumn';
import DataTableRow from './DataTableRow';
import DataTextCell from './cells/DataTextCell';

export default class DataTable extends CoreComponent {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            offset:  DataTable.const.DEFAULT_OFFSET,
            limit: this.props.limit !== undefined ? this.props.limit : DataTable.const.DEFAULT_LIMIT,
            sortColumn: this.props.sortColumn !== undefined ? this.props.sortColumn : null,
            sortOrder: this.props.sortOrder !== undefined ? this.props.sortOrder : null,
        }
    }

    buildClass() {
        super.buildClass();
        this.addClass('ui celled table sortable small');
    }

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<table className={this.getClassName()}>
            <DataTableHeader parentProps={this.props} />
            <DataTableBody parentProps={this.props} />
        </table>)
    }
}

DataTable.const = {
    DEFAULT_LIMIT:  5,
    DEFAULT_OFFSET: 0,
}

DataTable.Column = DataTableColumn;
DataTable.Row    = DataTableRow;

DataTable.Cell = {
    Text: DataTextCell
}