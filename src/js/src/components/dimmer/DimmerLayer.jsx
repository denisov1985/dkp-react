import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

/**
 * Dimmer layer class
 */
export default class DimmerLayer extends CoreComponent {

    /**
     * Build class
     */
    buildClass() {
        this.addClass('ui dimmer inverted transition')
        if (this.props.visible) {
            this.addClass('visible active')
        }
    }

    /**
     * Build style
     */
    buildStyle() {
        if (this.props.visible) {
            this.addStyle('display', 'block !important');
            this.addStyle('borderRadius', '.28571429rem');
        }
    }

    /**
     * Renders loader
     * @returns {XML}
     */
    renderLoader() {
        return (<div className="ui text loader"></div>);
    }

    /**
     * Render dimmer layer
     * @returns {XML}
     */
    render() {
        return (<div className={this.getClass()} style={this.getStyle()}>{this.props.loading && this.renderLoader()}</div>)
    }


}