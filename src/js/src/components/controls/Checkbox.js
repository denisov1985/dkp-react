import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Checkbox extends CoreComponent {

    onChange = () => {
        this.props.onChange(this);
    }

    /**
     * Abstract class don't render
     * @returns {XML}
     */
    render() {
        return (<div style={{width: '17px'}} className="ui checkbox">
            <input onChange={this.onChange} checked={this.props.checked} type="checkbox" />
            <label></label>
        </div>);
    }
}