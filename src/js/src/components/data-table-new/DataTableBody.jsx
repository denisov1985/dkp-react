import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataTableRow from './DataTableRow';

export default class DataTableBody extends CoreComponent {

    /**
     * Render row
     * @param record
     * @param index
     * @returns {XML}
     */
    renderRow = (record, index) => {
        return (<DataTableRow key={index}>
            {this.props.parent.mapColumns(this.renderCell.bind(this, record))}
        </DataTableRow>)
    }

    /**
     * Render cell
     * @param element
     * @param index
     * @returns {XML|String}
     */
    renderCell = (record, element, index) => {
        return this.renderElementWithProps({
            record: record,
            key: index
        }, element);
    }

    /**
     * Render no records row
     * @returns {XML}
     */
    renderNoRecords() {
        return (<tr>
            <td className="center aligned" colSpan={this.props.parent.getColumns().length}>No records found</td>
        </tr>)
    }

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<tbody>
            {this.props.parent.getDataset().size > 0 ? this.props.parent.mapDataset(this.renderRow) : this.renderNoRecords()}
        </tbody>)
    }
}

