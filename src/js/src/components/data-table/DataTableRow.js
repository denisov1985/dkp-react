import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableRow extends CoreComponent {

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<tr onClick={this.onClick}>
            {this.props.children.map((cell, index) => {
                return (<td key={this.getKey(index)}>
                    {this.renderElementWithProps({
                        record: this.props.record
                    }, cell.props.children)}
                </td>)
            })}
        </tr>)
    }

}