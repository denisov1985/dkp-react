import React, {Component} from 'react'
import {Link} from 'react-router';
import CoreComponent from '../core/CoreComponent';

class Menu extends CoreComponent {

    buildClass() {
        this.addClass('menu');
        if (this.props.visible) {
            this.addClass('visible');
        }
    }

    buildStyle() {
        if (this.props.visible) {
            this.addStyle('display', 'block');
        }
    }

    /**
     * Render item
     * @returns {XML}
     */
    render() {
        return (
            <div style={this.getStyle()} className={this.getClass()}>
                {this.props.children}
            </div>
        )
    }
}

export default Menu;