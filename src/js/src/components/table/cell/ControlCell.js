import React, {Component} from 'react'
import CoreCell from './CoreCell';

export default class ControlCell extends CoreCell {
    render() {
        return (
            <span>{this.props.children}</span>
        )
    }
}