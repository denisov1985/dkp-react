import React, {Component} from 'react'
import {Link} from 'react-router';
import CoreComponent from '../core/CoreComponent';
import Menu from './Menu';

class Group extends CoreComponent {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            hovered: false
        }
    }

    componentDidMount () {
        let el = document.getElementById('body')
        el.addEventListener('click', this.handleDocumentClick)
    }

    handleDocumentClick = () => {
        if (!this.state.hovered && this.state.expanded) {
            this.setState({
                expanded: false
            });
        }
    }

    buildClass() {
        this.addClass('ui dropdown item');
        if (this.state.expanded) {
            this.addClass('visible active');
        }

        if (this.props.active) {
            this.addClass('active');
        }
    }

    /**
     * On toggle dropdown
     * @param e
     */
    onToggle = (e) => {
        this.setState({
            expanded: !this.state.expanded,
        })
    }

    /**
     * On mouse enter
     */
    onMouseEnter = () => {
        this.setState({
            hovered: true
        })
    }

    /**
     * On mouse leave
     */
    onMouseLeave = () => {
        this.setState({
            hovered: false
        })
    }

    /**
     * Render item
     * @returns {XML}
     */
    render() {
        return (<div onClick={this.onToggle} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={this.getClass()}>
            {this.props.title}
            <i className="dropdown icon"></i>
            <Menu visible={this.state.expanded}>
                {this.props.children}
            </Menu>
        </div>)
    }
}

export default Group;