import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Row extends CoreComponent {
    render() {
        if (this.props.condition !== undefined) {
            this.props.condition(this);
        }

        return <tr className={this.getClass()}>{this.props.children}</tr>
    }
}