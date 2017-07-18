import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataTableSorter extends CoreComponent {

    onSort = () => {
        const order = this.props.parent.props.provider.getIn(['sort', 'order'], 'asc') === 'asc' ? 'desc' : 'asc';
        this.props.parent.update(
            this.props.parent.props.provider
                .setIn(['sort', 'order'], order)
                .setIn(['sort', 'field'], this.props.element.props.field)
        );
    }

    getSort() {
        return this.props.parent.props.provider.get('sort');
    }

    buildClass() {
        if (this.getSort().get('field') === this.props.element.props.field) {
            if (this.getSort().get('order') === 'asc') {
                this.addClass("sorted ascending")
            }   else  {
                this.addClass("sorted descending");
            }
        }
    }

    render() {
        return (<th onClick={this.onSort} className={this.getClass()} width={this.props.width}>{this.props.children}</th>)
    }
}
