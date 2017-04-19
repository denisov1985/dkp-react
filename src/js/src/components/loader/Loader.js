import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Loader extends CoreComponent {

    constructor(props) {
        super(props);
    }

    render() {
        this.reset();
        this.addClass('ui inverted dimmer transition');
        if (this.props.visible) {
            this.addClass('visible active');
        }
        return (
            <div className={this.getClass()}>
                <div className="ui text loader">Loading</div>
            </div>
        );
    }
}