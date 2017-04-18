import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class PagerView extends CoreComponent {
    render() {
        return (
            <div className="ui right floated pagination menu small">
                <a className="icon item">
                    <i className="left chevron icon"></i>
                </a>
                <a className="item active">1</a>
                <a className="item">2</a>
                <a className="item">3</a>
                <a className="item">4</a>
                <a className="icon item">
                    <i className="right chevron icon"></i>
                </a>
            </div>
        )
    }
}