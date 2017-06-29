import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class FormError extends CoreComponent {

    buildClass() {
        this.addClass('ui error message')
        if (this.props.errorMessage) {
            this.addClass('active visible')
        }
    }

    render() {
        return (<div className={this.getClass()}>
            <ul className="list">
                <li>{this.props.errorMessage}</li>
            </ul>
        </div>);
    }

}