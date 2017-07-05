import React, {Component} from 'react'
import Element from '../Element';

export default class SearchText extends Element {

    buildClass() {
        this.addClass("text");
        if (this.props.search !== '') {
            this.addClass("filtered");
        }
    }

    render() {
        return (
            <div className={this.getClass()}>{this.props.children}</div>
        );
    }
}