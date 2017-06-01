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
        let parts = props.column.props.field.split('.');
        let item = props.record;
        for (let i in parts) {
            item = item[parts[i]];
        }
        return item
    }

    /**
     * Abstract class don't render
     * @returns {XML}
     */
    render() {
        return (<td className="center aligned">{this.props.children}</td>);
    }
}