import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Row extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    buildClass() {
        super.buildClass();
        if (this.props.record.selected) {
            this.addClass('active');
        }
    }

    render() {
        if (this.props.condition !== undefined) {
            this.props.condition(this);
        }


        return <tr className={this.getClass()}>
            {this.props.columns.map((cell, key) => {
                return (<td key={key}>
                    {this.renderElementWithProps({
                        record: this.props.record,
                        row: this
                    }, cell.props.children)}
                </td>)
            })}
        </tr>
    }
}