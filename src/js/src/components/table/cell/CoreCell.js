import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class CoreCell extends CoreComponent {

    getValue() {
        let parts = this.props.field.split('.');
        let item = this.props.record;
        for (let i in parts) {
            item = item[parts[i]];
        }
        return item
    }

    render() {
        return null;
    }
}