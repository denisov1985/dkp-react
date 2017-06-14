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
        console.log(this);
        let name = this.props.name;
        let parts = name.split('.');
        if (this.props.form.props.dataset == undefined) {
            return '';
        }
        if (this.props.form.props.dataset[parts[1]] == null) {
            return '';
        }
        let item = this.props.form.props.dataset;
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