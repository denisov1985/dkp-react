import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Loader from '../loader/Loader';

export default class ModalDimmer extends CoreComponent {

    /**
     * Build styles
     */
    buildStyle() {
        if (this.props.visible) {
            this.addStyle('display', 'block !important')
        }
    }

    /**
     * Build classes
     */
    buildClass() {
        this.addClass('ui dimmer modals page transition');
        if (this.props.visible) {
            this.addClass('visible active');
        }
    }

    onClick = (e) => {
        console.log('dimmer click');
        console.log(e);
        e.stopPropagation();

        this.props.onClick();
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <div onClick={this.onClick} className={this.getClass()} style={this.getStyle()}>
                {this.props.children}
            </div>
        )
    }
}