import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataSorter extends CoreComponent {

    onSortClick = () => {
        let {column, table} = {...this.props};
        table.setState({
            sorter: {
                ...table.state.sorter,
                column: column.props.field,
                order: !table.state.sorter.order
            }
        });
    }

    /**
     * Render sorting column
     * @returns {string}
     */
    render() {
        let {column, table} = {...this.props};
        let className = '';
        if (column.props.field === table.state.sorter.column) {
            className += table.state.sorter.order ? 'sorted ascending' : 'sorted descending'
        }
        return this.renderElementWithProps({
            onClick: this.onSortClick,
            className: className
        }, this.props.children)
    }
}

DataSorter.sort = (field, order) => {
    let result = order ? -1 : 1;
    let sorters = {
        default: (a, b) => {
            if (a[field] > b[field]) {
                return result;
            }

            if (a[field] < b[field]) {
                return result * -1
            }

            if (a[field] === b[field]) {
                return 0
            }
        }
    }
    return (sorter) => sorters[sorter];
}