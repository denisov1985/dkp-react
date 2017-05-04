import React, {Component} from 'react'
import CoreCell from './CoreCell';

export default class BooleanCell extends CoreCell {
    render() {
        return (
            <span>{this.getValue() ? this.getProp('valueTrue', 'Yes') : this.getProp('valueFalse', 'No')}</span>
        )
    }
}