import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Button extends CoreComponent {

    constructor(props) {
        super(props);
        this.initClasses(props);
    }

    componentWillUpdate = (nextProps) => {
        this.initClasses(nextProps);
    }

    initClasses = (nextProps) => {
        this.reset();
        this.addClass('ui button');
        if (nextProps.icon !== undefined) {
            this.addClass('icon');
        }
        if (nextProps.children !== undefined) {
            this.addClass('labeled');
        }
        if (nextProps.isFetching) {
            this.addClass('loading');
            this.addClass('disabled');
        }

        if (nextProps.disabled) {
            this.addClass('disabled');
        }
    }
    render() {
        return (<button onClick={this.onClick} className={this.getClass()} type="button">{this.getIcon()}{this.props.children}</button>)
    }
}