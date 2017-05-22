import React, {Component} from 'react'
import CoreComponent from '../../../core/CoreComponent';

export default class Checkbox extends CoreComponent {

    getLabel() {
        if (this.props.children !== undefined) {
            return (<label>Checkbox</label>)
        }
        return null;
    }

    render() {
        return (<div className="ui checkbox checked">
            <input type="checkbox" className="hidden" />
            <label>{this.props.children}</label>
        </div>);
    }

}
