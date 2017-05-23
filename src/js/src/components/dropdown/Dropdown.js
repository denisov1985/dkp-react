import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Item from './Item';

export default class Dropdown extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    buildClass() {
        super.buildClass();
        this.addClass('ui button');
    }

    onToggleClick = () => {
        this.setState({
            open: true
        })
    }

    onMouseOut = (event) => {
        this.setState({
            open: false
        })
    }

    render() {
        let menuClass = "menu transition";
        let buttonClass = "ui floating labeled icon dropdown button visible";
        this.state.open && (menuClass = menuClass + ' visible') && (buttonClass += ' upward active');
        return (
            <div onMouseLeave={this.onMouseOut} onMouseEnter={this.onToggleClick} className={buttonClass} tabIndex="0">
                <i className="dropdown icon"></i>
                <span className="text">{this.getProp('title', 'Dropdown')}</span>
                <div className={menuClass} tabIndex="-1" style={{display: 'block !important'}}>
                    {this.renderElementWithProps({
                        parent: this
                    }, this.props.children)}
                </div>
            </div>
        )
    }
}

Dropdown.Item = Item;