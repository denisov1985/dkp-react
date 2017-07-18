import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

class Menu extends CoreComponent {

    buildClass() {
        this.addClass('ui segment');
        if (this.props.type) {
            this.addClass(this.props.type);
        }
    }

    /**
     * Render item
     * @returns {XML}
     */
    render() {
        return (
            <div className={this.getClass()}>
                {this.props.children}
            </div>
        )
    }
}

export default Menu;