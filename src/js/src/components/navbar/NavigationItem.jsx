import React, {Component} from 'react'
import {Link} from 'react-router';
import CoreComponent from '../core/CoreComponent';

class NavigationItem extends CoreComponent {

    /**
     * Optimize unnecessary rendering
     * @returns {boolean}
     */
    shouldComponentUpdate() {
        return false;
    }

    buildClass() {
        this.addClass('item');
        if (this.props.align && this.props.align === 'right') {
            this.addClass('right');
        }
    }

    /**
     * Render item
     * @returns {XML}
     */
    render() {
        return (<Link to={this.props.path} className={this.getClass()} activeClassName="active">
            {this.props.children}
        </Link>)
    }
}

export default NavigationItem;