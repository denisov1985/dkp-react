import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class CoreCell extends CoreComponent {

    /**
     * Get cell value from dataset
     */
    getValue() {
        return this.getFieldValue(this.props);
    }

    getFieldValue(props) {
        return props.record.getIn(['attributes', props.column.props.field]);
    }

    /**
     * Abstract class don't render
     * @returns {XML}
     */
    render() {
        return (<td className="center aligned">{ this.renderElementWithProps({
            record: this.props.record,
            column: this.props.column,
            table: this.props.table
        }, this.props.children)}</td>);
    }
}