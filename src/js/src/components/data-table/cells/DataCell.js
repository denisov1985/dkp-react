import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class CoreCell extends CoreComponent {

    /**
     * Get cell value from dataset
     */
    getValue() {
        let parts = this.props.field.split('.');
        let item = this.props.record.dataset;
        for (let i in parts) {
            item = item[parts[i]];
        }
        return item
    }

    /**
     * Abstract class don't render
     * @returns {null}
     */
    render() {
        throw new Error('Should not be rendered')
        return null;
    }
}