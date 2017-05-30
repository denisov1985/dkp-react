import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataSorter extends CoreComponent {

    onSortClick = () => {
        console.log(this.props.column);
    }

    /**
     * Render sorting column
     * @returns {string}
     */
    render() {
        return this.renderElementWithProps({
            onClick: this.onSortClick,
            className: 'sorted descending'
        }, this.props.children)
    }
}