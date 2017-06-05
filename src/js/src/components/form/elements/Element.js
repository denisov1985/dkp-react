import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class Element extends CoreComponent {

    /**
     * Get full name
     * @returns {string}
     */
    getFullName() {
        let name = this.props.name;
        let parts = name.split('.');
        return parts[0] + '[' + parts[1] + ']';
    }

    /**
     * Get field name
     * @returns {*}
     */
    getFieldName() {
        let name = this.props.name;
        let parts = name.split('.');
        return parts[1];
    }

    /**
     * Get field value
     * @returns {*}
     */
    getValue() {
        let name = this.props.name;
        let parts = name.split('.');
        if (this.props.form.state == undefined) {
            return '';
        }
        if (this.props.form.state[parts[1]] == null) {
            return '';
        }
        let item = this.props.form.state;
        for (let i in parts) {
            if (i > 0) {
                item = item[parts[i]];
            }
        }
        return item;
    }

    /**
     * On change
     * @param e
     */
    onChange = (e) => {
        let state = this.props.form.state;
        if (e === undefined) {
            state[this.getFieldName()] = '';
        }   else  {
            state[this.getFieldName()] = e.target.value;
        }
        this.props.form.props.handler(this.getFieldName(), e.target.value);
        this.props.form.setState(state);
    }

    /**
     * Do not render
     * @returns {null}
     */
    render() {
        throw new Error('Abstract element could not be rendered');
        return null;
    }

}