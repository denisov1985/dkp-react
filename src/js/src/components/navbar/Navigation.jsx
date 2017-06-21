import React, {Component} from 'react'
import {Link} from 'react-router';
import CoreComponent from '../core/CoreComponent';
import NavigationItem from './NavigationItem';

class Navigation extends CoreComponent {

    buildClass() {
        this.addClass('ui inverted secondary menu');
    }

    render() {
        return (<div className="ui inverted segment" style={{ borderRadius: 0}}>
            <div className={this.getClass()}>
                {this.renderElementWithProps({
                    router: this.props.router
                }, this.props.children)}
            </div>
        </div>);
    }
}

Navigation.Item = NavigationItem;

export default Navigation;