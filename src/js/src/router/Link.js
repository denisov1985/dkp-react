import React, {Component} from 'react'

export default class Link extends Component {

    /**
     * On link click
     * @param item
     * @param e
     * @returns {boolean}
     */
    onClick(item, e) {
        if (typeof item.path == 'undefined') {
            e.preventDefault();
            return false;
        }
    }

    /**
     * Render link
     * @returns {XML}
     */
    render() {
        let {route, className, activeClassName, style} = this.props;
        let activeLinkClass = className + ' ' + activeClassName;
        style = typeof style == 'undefined' ? {} : style;
        let isActive = this.props.isSub ? route.isActiveSub() : route.isActive();

        return (<a style={style} onClick={this.onClick.bind(this, route)} href={route.getLink()} className={isActive ? activeLinkClass : className}>
            {this.props.children}
        </a>);
    }
}