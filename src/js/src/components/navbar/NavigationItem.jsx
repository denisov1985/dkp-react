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

    /**
     * Render item
     * @returns {XML}
     */
    render() {
        return (<Link to={this.props.path} className="item" activeClassName="active">
            {this.props.children}
        </Link>)
    }
}

export default NavigationItem;