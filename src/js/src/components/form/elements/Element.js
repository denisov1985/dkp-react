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
        return this.props.name
    }

    /**
     * Get field value
     * @returns {*}
     */
    getValue() {
        const path =['dataset', 'attributes'].concat(this.getProp('field', this.props.name).split('.'));
        return this.props.form.props.provider.getIn(path);
    }

    /**
     * On change
     * @param e
     */
    onChange = (e) => {
        this.props.form.props.handler(this.getFieldName(), e.target.value);
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