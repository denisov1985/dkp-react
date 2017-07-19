import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Menu extends CoreComponent {

    buildClass() {
        this.addClass("menu transition");
        if (this.props.visible) {
            this.addClass("visible active");
        }
    }

    /**
     * Render item
     * @param item
     * @returns {XML}
     */
    renderItem = (item) => {
        if (item.value.indexOf(this.props.search) == -1) {
            return null;
        }
        return (<div onClick={this.props.onSelect.bind(this, item)} className="item">{item.value}</div>);
    }

    /**
     * Render menu
     * @returns {XML}
     */
    render() {
        return (
            <div className={this.getClass()}>
                <div className="item disabled">Select field</div>
                {this.props.options.map((option, index) => {
                    return this.renderItem(option)
                })}
            </div>);
    }
}