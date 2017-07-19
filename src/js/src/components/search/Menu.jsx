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
    renderItem(item) {
        return (<div onClick={this.props.onSelect.bind(this, item)} className="item">{item.value}</div>);
    }

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