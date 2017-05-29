import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableBody extends CoreComponent {

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        console.log(this.props.parentProps.dataset);
        return (<tbody>
            {this.props.parentProps.dataset.map((record, index) => {
                return this.renderElementWithProps({
                    record: record,
                    key: this.getKey(index)
                }, this.props.parentProps.children)
            })}
        </tbody>)
    }
}

