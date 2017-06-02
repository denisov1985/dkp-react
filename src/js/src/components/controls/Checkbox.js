import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Checkbox extends CoreComponent {

    /**
     * Should override
     */
    onChange = () => {}

    /**
     * Abstract class don't render
     * @returns {XML}
     */
    render() {
        return (<div style={{width: '17px'}} className="ui checkbox">
            <input onChange={this.onChange} checked={false} type="checkbox" />
            <label></label>
        </div>);
    }
}