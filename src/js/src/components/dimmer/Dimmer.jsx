import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DimmerLayer from './DimmerLayer';

export default class Dimmer extends CoreComponent {

    /**
     * Build class
     */
    buildClass() {
        this.addClass('ui dimmable')
        if (this.props.visible) {
            this.addClass('dimmed')
        }
    }

    /**
     * Build style
     */
    buildStyle() {
        if (this.props.visible) {
            this.addStyle('borderRadius', '.28571429rem');
        }
    }

    /**
     * Render dimmer
     * @returns {XML}
     */
    render() {
        return (
            <div style={this.getStyle()} className={this.getClass()}>
                {this.props.children}
                <DimmerLayer loading={this.props.loading} visible={this.props.visible}/>
            </div>
        )
    }


}