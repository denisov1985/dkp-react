import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import DataTableFooter from './DataTableFooter';
import DataTableColumn from './DataTableColumn';
import DataTableRow from './DataTableRow';
import DataTablePanel from './DataTablePanel';
import DataTextCell from './cells/DataTextCell';

export default class DataTable extends CoreComponent {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            sortColumn: this.props.sortColumn !== undefined ? this.props.sortColumn : null,
            sortOrder: this.props.sortOrder !== undefined ? this.props.sortOrder : null,
        }
    }

    buildClass() {
        super.buildClass();
        this.addClass('ui celled table sortable small');
    }

    getDataset = () => {

    }

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<table className={this.getClassName()}>
            <DataTableHeader parentProps={this.props} />
            <DataTableBody parentProps={this.props} />
            <DataTableFooter parentProps={this.props} />
        </table>)
    }
}

DataTable.Column = DataTableColumn;
DataTable.Row    = DataTableRow;
DataTable.DataTablePanel = DataTablePanel;

DataTable.Cell = {
    Text: DataTextCell
}