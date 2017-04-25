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

        if (nextProps.details === undefined) {
            return false;
        }

        console.log('DETAILS');
        console.log(nextProps.details);

        if (nextProps.details.dataset.id === nextProps.record.id && nextProps.details.params.tag === 'ban' && nextProps.details.status === 1) {
            this.addClass('loading');
            this.addClass('disabled');
        }

        if (nextProps.record.name === 'BANNED USER') {
            this.addClass('disabled');
        }
    }
    render() {
        return (<button onClick={this.onClick} className={this.getClass()} type="button">{this.getIcon()}{this.props.children}</button>)
    }
}