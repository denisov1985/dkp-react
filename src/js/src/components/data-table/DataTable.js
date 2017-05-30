import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import DataTableFooter from './DataTableFooter';
import DataTableColumn from './DataTableColumn';
import DataTableRow from './DataTableRow';
import DataTablePanel from './DataTablePanel';
import DataTextCell from './cells/DataTextCell';
import DataPager from './addons/DataPager';

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
            min: 0,
            max: null
        }
    }

    buildClass() {
        super.buildClass();
        this.addClass('ui celled table sortable small');
    }

    /**
     * Get dataset
     */
    getDataset = (initial) => {
        if (initial) {
            return this.props.dataset;
        }
        let dataset = this.props.dataset;
        console.log('getDataset');
        console.log(this);
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
        return (<table className={this.getClassName()}>
            <DataTableHeader columns={this.props.children.props.children} />
            <DataTableBody dataset={this.getDataset()} column={this.props.children} />
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
    Text: DataTextCell
}