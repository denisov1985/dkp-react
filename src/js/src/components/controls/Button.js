import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Button extends CoreComponent {
    buildClass() {
        super.buildClass();
        this.addClass('ui button');
        if (this.props.icon !== undefined) {
            this.addClass('icon');
        }
        if (this.props.children !== undefined && this.props.icon !== undefined) {
            this.addClass('labeled');
        }

        if (this.props.fluid !== undefined) {
            this.addClass('fluid');
        }

        if (this.isLoading()) {
            this.addLoading();
        }
        if (this.props.disabled) {
            this.addClass('disabled');
        }
    }

    isLoading() {
        return this.getProp('loading', false)
    }

    addLoading() {
        this.addClass('loading');
        this.addDisabled();
    }

    addDisabled() {
        this.addClass('disabled');
    }

    onClick = (e) => {
        this.props.onClick(e, this);
    }

    render() {
        return (<button onClick={this.onClick} className={this.getClass()} type="button">{this.getIcon()}{this.props.children}</button>)
    }
}