import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import PagerView from './PagerView';
import Row from '../Row';
import Dropdown   from '../../../components/dropdown/Dropdown';

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

    onClick = () => {
        console.log('On Delete All click');
        this.props.onDeleteBatchClick && this.props.onDeleteBatchClick(this);
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
                        <Row condition={this.props.rowCondition} key={index} record={row} columns={this.props.columns} />
                    ))}
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan={this.props.columns.length}>
                        <Dropdown title="Choose action..." >
                            <Dropdown.Item onClick={this.onClick}>Delete</Dropdown.Item>
                            <Dropdown.Item>Ban</Dropdown.Item>
                        </Dropdown>
                        <PagerView table={this.props.table} />
                    </th>
                </tr>
                </tfoot>
            </table>
            </div>
        )
    }
}