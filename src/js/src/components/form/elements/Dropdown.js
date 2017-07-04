import React, {Component} from 'react'
import Element from './Element';

export default class Dropdown extends Element {
    render() {
        return (
            <div className="ui search dropdown selection visible">
                <select>
                    <option value="">State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                </select>
                <i className="dropdown icon"/>
                <input className="search"/>
                <div className="text"></div>
                <div className="menu transition"  style={{display: 'block !important'}}>
                    <div className="item selected">Alabama</div>
                    <div className="item active">Alaska</div>
                    <div className="item">Arizona</div>
                </div>
            </div>);
    }
}