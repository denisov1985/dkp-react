import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Loader from '../loader/Loader';

export default class Footer extends CoreComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="actions">
                {this.props.children}
            </div>
        )
    }
}