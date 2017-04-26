import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Loader extends CoreComponent {

    constructor(props) {
        super(props);
    }

    buildClass() {
        this.addClass('ui inverted dimmer transition');
        if (this.props.visible) {
            this.addClass('visible active');
        }
    }

    render() {
        return (
            <div style={{
                borderTopLeftRadius: 4 + 'px',
                borderTopRightRadius: 4 + 'px',
                borderBottomLeftRadius: 4 + 'px',
                borderBottomRightRadius: 4 + 'px',
            }} className={this.getClass()}>
                <div className="ui text loader">Loading</div>
            </div>
        );
    }
}