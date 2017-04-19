import React, {Component} from 'react'
import CoreCell from './CoreCell';

export default class TextCell extends CoreCell {
    render() {
        return (
            <span>{this.getValue()}</span>
        )
    }
}