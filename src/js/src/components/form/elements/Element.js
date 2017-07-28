import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class Element extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: this.getValue()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: this.getValue(nextProps)
        })
    }

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
    getValue(props, defaultValue) {
        if (typeof props === 'undefined') {
            props = this.props;
        }
        if (typeof defaultValue === 'undefined') {
            defaultValue = '';
        }
        const path =['dataset', 'attributes'].concat(this.getProp('field', props.name).split('.'));
        return props.form.props.provider.getIn(path, defaultValue);
    }

    /**
     * On change
     * @param e
     */
    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    onBlur = () => {
        this.props.form.props.handler(this.getFieldName(), this.state.value);
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