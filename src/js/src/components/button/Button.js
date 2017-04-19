import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Button extends CoreComponent {

    constructor(props) {
        super(props);
        this.addClass('ui button');
        if (this.props.icon !== undefined) {
            this.addClass('icon');
        }
        if (this.props.children !== undefined) {
            this.addClass('labeled');
        }
        if (this.props.isFetching) {
            this.addClass('loading');
        }
    }

    render() {
        return (<button onClick={this.onClick} className={this.getClass()} type="button">{this.getIcon()}{this.props.children}</button>)
    }
}