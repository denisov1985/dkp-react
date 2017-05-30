import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableBody extends CoreComponent {

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<tbody>
            {this.props.dataset.map((record, index) => {
                return this.renderElementWithProps({
                    record: record,
                    key: this.getKey(index)
                }, this.props.column)
            })}
        </tbody>)
    }
}

