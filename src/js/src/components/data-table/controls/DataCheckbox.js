import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import Checkbox from '../../controls/Checkbox';

export default class DataCheckbox extends CoreComponent {

    onChange = (e) => {
        let value = !this.getNested(this.props.table.state, this.getPath(), false);
        let state = this.setNested(this.props.table.state, this.getPath(), value);
        this.props.table.setState(state);
    };

    getPath() {
        return ['rows', 'selected', this.props.record.id];
    }

    isChecked() {
        return this.getNested(this.props.table.state, this.getPath(), false);
    }

    render() {
        return (<Checkbox checked={this.isChecked()} onChange={this.onChange} />)
    }

}