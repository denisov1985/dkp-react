import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import TableView from './view/TableView';
import Multisort from '../../utils/Multisort';

import Column from './Column';
import TextCell from './cell/TextCell';
import ControlCell from './cell/ControlCell';
import BooleanCell from './cell/BooleanCell';

import Button from './controls/button/Button';
import ActiveProp from './controls/condition/ActiveProp';
import VisibleProp from './controls/condition/VisibleProp';

export default class Table extends CoreComponent {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.defaultLimit = 20;

        this.state = {
            offset: 0,
            limit: this.props.limit !== undefined ? this.props.limit : this.defaultLimit,
            sortColumn: this.props.sortColumn !== undefined ? this.props.sortColumn : null,
            sortOrder: this.props.sortOrder !== undefined ? this.props.sortOrder : null,
        }
    }

    /**
     * On sorting click
     * @param column
     * @returns {boolean}
     */
    onSortClick = (column) => {
        if (column.props.title === '') {
            return false;
        }
        this.setState(Object.assign({}, this.state, {
            sortColumn: column.props.children.props.field,
            sortOrder: !this.state.sortOrder
        }));
    }

    /**
     * Get table records
     * @returns {Array}
     */
    getDataset() {
        let dataset = this.props.dataset;
        if (!Array.isArray(dataset)) {
            dataset = [];
        }

        let sortedDataset = Multisort.sort(dataset, [this.state.sortColumn], [this.state.sortOrder ? 'ASC' : 'DESC']);
        return dataset;
    }

    /**
     * Get dataset page
     * @returns {Array.<*>}
     */
    getDatasetPage() {
        let dataset = this.getDataset();
        let start = parseInt(this.state.offset) * parseInt(this.state.limit);
        let end = parseInt(this.state.offset) * parseInt(this.state.limit) + parseInt(this.state.limit);
        return dataset.slice(start, end);
    }

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (
            <TableView
                columns={this.props.children}
                dataset={this.getDatasetPage()}
                onSortClick={this.onSortClick}
                sortColumn={this.state.sortColumn}
                sortOrder={this.state.sortOrder}
                isFetching={this.props.isFetchind}
                table={this}
            />
        )
    }
}

Table.Column    = Column;
Table.Cell      = TextCell;
Table.Cell.Text = TextCell;
Table.Cell.Boolean = BooleanCell;
Table.Cell.Control = ControlCell;

Table.Control   = {};
Table.Control.Button = Button;

Table.Control.Condition = {};
Table.Control.Condition.ActiveProp = ActiveProp;
Table.Control.Condition.VisibleProp = VisibleProp;