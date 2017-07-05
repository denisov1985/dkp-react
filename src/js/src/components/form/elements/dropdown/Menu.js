import React, {Component} from 'react'
import Element from '../Element';

export default class Menu extends Element {

    constructor() {
        super();
        this.state = {
            expanded: false
        }
    }

    buildClass() {
        this.addClass("menu transition");
        if (this.props.visible) {
            this.addClass("visible");
        }
    }

    getOptions() {
        if (!this.props.visible) {
            return [];
        }
        return this.props.options;
    }

    componentDidUpdate() {
        this.refs.menu.scrollTop = 0;
    }

    renderSelectedOption() {
        if (this.props.search !== '') {
            return null;
        }
        return this.renderOption(this.props.selected, 'item active selected');
    }

    render() {
        return (
            <div ref="menu" className={this.getClass()}  style={{display: 'block !important', zIndex: 1000}}>
                {this.renderSelectedOption()}
                {this.getOptions().map((option) => {
                    if (option.getIn(['attributes', 'name']).toLowerCase().indexOf(this.props.search.toLowerCase()) === -1) {
                        return null;
                    }
                    return this.renderOption(option, 'item')
                })}
            </div>);
    }

    renderOption(option, itemClass) {
        if (option === null) {
            return null;
        }
        return (<div onClick={this.props.onSelect.bind(this, option)} key={option.get('id')} className={itemClass}>{option.getIn(['attributes', 'name'])}</div>)
    }
}