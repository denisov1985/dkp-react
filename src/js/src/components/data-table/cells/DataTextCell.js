import React, {Component} from 'react'
import DataCell from './DataCell';

export default class DataTextCell extends DataCell {
    render() {
        return (
            <span>{this.getValue()}</span>
        )
    }
}