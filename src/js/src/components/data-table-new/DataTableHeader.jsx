import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableHeader extends CoreComponent {

    /**
     * Render column
     * @param element
     * @param index
     * @returns {XML}
     */
    renderHeaderColumn(element, index) {
        return (<th width={element.props.width} key={index}>{element.props.title}</th>);
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

