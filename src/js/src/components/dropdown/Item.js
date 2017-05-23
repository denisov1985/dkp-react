import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Item extends CoreComponent {

    onClick = () => {
        this.props.parent.setState({
            open: false
        });

        this.props.onClick && this.props.onClick();
    }

    render() {
        return (
            <div onClick={this.onClick} className="item">{this.props.children}</div>
        )
    }


}