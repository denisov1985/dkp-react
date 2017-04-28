import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Button extends CoreComponent {

    shouldComponentUpdate(nextProps, nextState) {

        if(nextProps.details === undefined) {
            return true;
        }

        if (nextProps.details.dataset.id !== nextProps.record.id) {
            return false;
        }

        //console.log('_______________');
        //console.log(this.props);
        //console.log(this.props.details.status + ' ' + nextProps.details.status + ' --- ' + nextProps.details.dataset.id + ' ' + nextProps.record.id + ' : ' + nextProps.type + ' ' + nextProps.details.params.type) ;
        return true;
    }

    buildClass() {

        super.buildClass();

        this.addClass('ui button');

        if (this.props.icon !== undefined) {
            this.addClass('icon');
        }

        if (this.props.children !== undefined) {
            this.addClass('labeled');
        }

        if (this.props.isFetching) {
            this.addClass('loading');
            this.addClass('disabled');
        }

        if (this.props.logic !== undefined) {
            let isFetching = this.props.logic(this.props);
        }

        if (this.props.details === undefined) {
            return false;
        }

        if (this.props.details.dataset.id === this.props.record.id && this.props.details.params.type === this.getProp('type') && this.props.details.status === 1) {
            this.addClass('loading');
            this.addClass('disabled');
        }

        if (this.props.record[this.getProp('disabledKey', 1)] === this.getProp('disabledValue')) {
            this.addClass('disabled');
        }

        if (this.props.record[this.getProp('disabledKey', 'id')] !== this.getProp('disabledValueNot', this.props.record[this.getProp('disabledKey', 'id')])) {
            this.addClass('disabled');
        }

        if (this.props.details.dataset.id !== this.props.record.id) {
            return true;
        }

        if (this.props.details.status === 1) {
            this.addClass('disabled');
        }

        console.log('OK');

    }

    getDisabledState() {

    }

    render() {
        return (<button onClick={this.onClick} className={this.getClass()} type="button">{this.getIcon()}{this.props.children}</button>)
    }
}