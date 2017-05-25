import React, {Component} from 'react'
import CoreComponent from '../../../core/CoreComponent';

export default class Checkbox extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    onChange = () => {
        this.props.onSelect && this.props.onSelect(this);
    }

    render() {
        let checkboxClass = "ui checkbox";
        this.props.record.selected && (checkboxClass += ' checked');
        return (<div onClick={this.onChange} className={checkboxClass}>
            <input onChange={this.onChange} type="checkbox" className="hidden" checked={this.props.record.selected} />
            <label>{this.props.children}</label>
        </div>);
    }

}
