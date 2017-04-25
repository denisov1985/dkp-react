import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import PagerView from './PagerView';

export default class TableView extends CoreComponent {

    getElementClass() {
        return "ui celled  table sortable small";
    }

    getHeaderStyle(column) {
        let style = {};
        if (typeof column.props.width !== 'undefined') {
            style.width = column.props.width;
        }
        return style;
    }

    getSortingClass(column) {
        if (column.props.title === ''  || column.props.title === undefined) {
            return '';
        }
        console.log(column.props.title);
        let classParts = [''];
        if (this.props.sortColumn === column.props.children.props.field) {
            this.props.sortOrder ? classParts.push('sorted descending') : classParts.push('sorted ascending');
        }
        return classParts.join(' ');
    }

    onSortClick(column, e) {
        e.preventDefault();
        if (column.props.title === ''  || column.props.title === undefined) {
            return false;
        }
        this.props.onSortClick(column);
    }

    render() {
        let className = "ui inverted dimmer transition ";
        if (this.props.isFetching === true) {
            className = className + "active visible";
        }

        return (
            <div className="ui dimmable dimmed">
                <div className={className}>
                    <div className="ui text loader">Loading</div>
                </div>
                <table className={this.getClass()}>
                <thead>
                <tr>
                    {this.props.columns.map((column, index) => {
                        return (<th
                            onClick={this.onSortClick.bind(this, column)}
                            className={this.getSortingClass(column)}
                            style={this.getHeaderStyle(column)}
                            key={index}>
                            {column.props.title}
                        </th>)
                    })}
                </tr>
                </thead>
                <tbody>
                    {this.props.dataset.map((row, index) => (
                        <tr key={index}>
                            {this.props.columns.map((cell, key) => {
                                return (<td key={key}>
                                    {this.renderElementWithProps({
                                        record: row
                                    }, cell.props.children)}
                                </td>)
                            })}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan="4">
                        <PagerView table={this.props.table} />
                    </th>
                </tr>
                </tfoot>
            </table>
            </div>
        )
    }
}