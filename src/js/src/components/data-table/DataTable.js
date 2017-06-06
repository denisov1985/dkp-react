import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import DataTableFooter from './DataTableFooter';
import DataTableColumn from './DataTableColumn';
import DataTableRow from './DataTableRow';
import DataTablePanel from './DataTablePanel';
import DataTextCell from './cells/DataTextCell';
import DataCell from './cells/DataCell';
import DataTextEditCell from './cells/DataTextEditCell';
import DataPager from './addons/DataPager';
import DataTableEmpty from './DataTableEmpty';
import DataSorter from './addons/DataSorter';

/**
 * Controls
 */
import DataCheckbox from './controls/DataCheckbox';

export default class DataTable extends CoreComponent {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            max: null,
            sorter: {
                column: this.props.sortColumn !== undefined ? this.props.sortColumn : null,
                order: this.props.sortOrder !== undefined ? this.props.sortOrder : null,
                type: 'default'
            },
            rows: {}
        }
    }


    buildClass() {
        super.buildClass();
        this.addClass('ui celled table sortable small blue');
    }

    /**
     * Get dataset
     */
    getDataset = (initial) => {
        if (initial) {
            return this.props.dataset;
        }
        let dataset = this.props.dataset;

        if (this.state.sorter.column !== null) {
            dataset = dataset.sort(DataSorter.sort(this.state.sorter.column, this.state.sorter.order)(this.state.sorter.type))
        }

        if (this.state.max !== null) {
            return dataset.slice(this.state.min, this.state.max);
        }   else  {
            return dataset;
        }
    }

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        if (this.props.dataset.length === 0) {
            return (<DataTableEmpty loading={this.props.status === 1} />)
        }
        return (
            <table className={this.getClassName()}>
            <DataTableHeader parent={this} columns={this.props.children.props.children} />
            <DataTableBody parent={this} dataset={this.getDataset()} column={this.props.children} />
            <DataTableFooter columns={this.props.children.props.children} >
                <DataPager parent={this} />
            </DataTableFooter>
        </table>)
    }
}

DataTable.Column = DataTableColumn;
DataTable.Row    = DataTableRow;
DataTable.DataTablePanel = DataTablePanel;

DataTable.Cell = {
    Default: DataCell,
    Text: DataTextCell,
    TextEdit: DataTextEditCell,
}

DataTable.Controls = {
    Checkbox: DataCheckbox
}