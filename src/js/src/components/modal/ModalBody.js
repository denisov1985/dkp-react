import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Loader from '../loader/Loader';

export default class Body extends CoreComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <div className="description">
                    {this.props.children}
                </div>
            </div>
        )
    }
}