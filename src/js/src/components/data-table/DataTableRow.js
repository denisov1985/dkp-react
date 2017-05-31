import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableRow extends CoreComponent {

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<tr onClick={this.onClick}>
            {this.props.children.map((column, index) => {
                return this.renderElementWithProps({
                        record: this.props.record,
                        column: column,
                        key: this.getKey(index),
                        table: this.props.table
                    }, column.props.children)
            })}
        </tr>)
    }

}