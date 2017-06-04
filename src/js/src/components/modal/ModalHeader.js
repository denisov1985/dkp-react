import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Loader from '../loader/Loader';

export default class Header extends CoreComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                {this.props.children}
            </div>
        )
    }
}