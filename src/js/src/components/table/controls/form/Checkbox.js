import React, {Component} from 'react'
import CoreComponent from '../../../core/CoreComponent';

export default class Checkbox extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
        console.log(props);
    }

    onChange = () => {
        console.log('ij1');
        console.log(this.state.checked);

        this.props.row.setState({
            selected: !this.props.row.state.selected
        })

        this.setState({
            checked: !this.state.checked
        });

        this.props.onSelect && this.props.onSelect(this);
    }

    render() {
        let checkboxClass = "ui checkbox";
        this.state.checked && (checkboxClass += ' checked');
        return (<div onClick={this.onChange} className={checkboxClass}>
            <input onChange={this.onChange} type="checkbox" className="hidden" checked={this.state.checked} />
            <label>{this.props.children}</label>
        </div>);
    }

}
