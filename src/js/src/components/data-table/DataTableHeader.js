import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableHeader extends CoreComponent {

    /**
     * Render view
     * @returns {XML}
     */
    render() {

        console.log(this.props.parentProps.children[0].constructor.name);

        return (<thead>
            <tr>
                {this.props.parentProps.children.props.children.map((column, index) => {
                    return (<th
                        key={this.getKey(index)}>
                        {column.props.title}
                    </th>)
                })}
            </tr>
        </thead>)
    }

}

