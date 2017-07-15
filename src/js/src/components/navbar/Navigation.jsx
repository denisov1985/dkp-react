import React, {Component} from 'react'
import {Link} from 'react-router';
import CoreComponent from '../core/CoreComponent';
import NavigationItem from './NavigationItem';
import Group from './Group';

class Navigation extends CoreComponent {

    buildClass() {
        this.addClass('ui stackable container fluid menu');
    }

    render() {
        return (<div className="ui stackable fluid container menu">
            <div className="item">
                <img src="/img/logo.png" />
            </div>
            {this.props.children}
        </div>);
    }
}

Navigation.Item = NavigationItem;
Navigation.Group = Group;

export default Navigation;