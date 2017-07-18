import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import DataTableFooter from './DataTableFooter';
import DataTableColumnData from './columns/DataTableColumnData';
import DataTableColumnText from './columns/DataTableColumnText';
import DataTableColumnControl from './columns/DataTableColumnControl';

import Button from '../button/Button';
import Dimmer from '../dimmer/Dimmer';

/**
 * Data Table component
 */
export default class DataTable extends CoreComponent {

    /**
     * Build class data
     */
    buildClass() {
        this.addClass("ui celled table sortable");
    }

    /**
     * Map columns
     * @param callback
     */
    mapColumns(callback) {
        return this.getColumns().map(callback);
    }

    /**
     * Map dataset
     * @param callback
     */
    mapDataset(callback) {
        return this.getDataset().map(callback);
    }

    /**
     * Get columns
     */
    getColumns() {
        return this.props.children;
    }

    /**
     * Get dataset
     */
    getDataset() {
        return this.props.provider.get('dataset');
    }

    isLoading() {
        return this.props.provider.get('status') === 1;
    }

    /**
     * Find All
     * @returns {*}
     */
    update(provider) {
        return this.props.source.findAll(
            provider
                .delete('repository')
                .delete('status')
                .delete('dataset')
                .toJS()
        );
    }

    /**
     * Render table
     * @returns {XML}
     */
    render() {
        return (
            <Dimmer loading={this.isLoading()} visible={this.isLoading()}>
                <table className={this.getClass()}>
                    <DataTableHeader parent={this}/>
                    <DataTableBody parent={this}/>
                    <DataTableFooter parent={this}/>
                </table>
            </Dimmer>);
    }
}

DataTable.Column = {
    Data: DataTableColumnData,
    Text: DataTableColumnText,
    Control: DataTableColumnControl,
}

DataTable.Controls = {
    Button: Button
}

