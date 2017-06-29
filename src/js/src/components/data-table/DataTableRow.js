import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableRow extends CoreComponent {

    buildClass() {
        super.buildClass();
        if (this.isSelected()) {
            this.addClass('active');
        }
        //let status = this.getNested(this.props.table.props, ['join', this.props.record.id, 'id', 'default', 'status'], 0)
        let status = 0;
        if (status === 1) {
            this.addClass('disabled');
        }
    }

    isSelected() {
        return this.getNested(this.props.table.state, ['rows', 'selected', this.props.record.id], false);
    }

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<tr className={this.getClass()} onClick={this.onClick}>
            {this.props.children.map((column, index) => {
                return this.renderElementWithProps({
                        record: this.props.record,
                        column: column,
                        key: this.getKey(index),
                        table: this.props.table
                    }, column.props.children)
            })}
        </tr>)
    }

}