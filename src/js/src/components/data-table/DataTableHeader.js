import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableHeader extends CoreComponent {

    /**
     * Render view
     * @returns {XML}
     */
    render() {

        return (<thead>
            <tr>
                {this.props.columns.map((column, index) => {
                    return (<th
                        key={this.getKey(index)}>
                        {column.props.title}
                    </th>)
                })}
            </tr>
        </thead>)
    }

}

