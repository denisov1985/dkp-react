import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataTableSorter from './addons/DataTableSorter';

export default class DataTableHeader extends CoreComponent {

    /**
     * Render column
     * @param element
     * @param index
     * @returns {XML}
     */
    renderHeaderColumn = (element, index) => {
        if (element.props.sortable) {
            return <DataTableSorter parent={this.props.parent} element={element} width={element.props.width} key={index}>{element.props.title}</DataTableSorter>
        }   else  {
            return (<th width={element.props.width} key={index}>{element.props.title}</th>);
        }
    }

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (
            <thead>
                <tr>
                    {this.props.parent.mapColumns(this.renderHeaderColumn)}
                </tr>
            </thead>)
    }

}

