import React, {Component} from 'react'
import Element from '../Element';
import Menu from './Menu';
import SearchText from './SearchText';

export default class Dropdown extends Element {

    /**
     *
     */
    constructor() {
        super();
        this.state = {
            expanded: false,
            value: null,
            search: '',
            hovered: false
        }
    }

    buildClass() {
        this.addClass("ui search dropdown selection visible");
        if (this.state.expanded) {
            this.addClass('active');
        }
    }

    buildStyle() {
        if (this.state.expanded) {
            this.addStyle('zIndex', 2000)
        }
    }

    render() {
        return (
            <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={this.getClass()} style={this.getStyle()}>
                <i className="dropdown icon" onClick={this.onToggle}/>
                <input value={this.state.search} className="search" onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} />
                <SearchText search={this.state.search}>{this.getSelectedValue()}</SearchText>
                <Menu expanded={this.state.expanded} selected={this.state.value} onSelect={this.onSelect} search={this.state.search} visible={this.state.expanded} options={this.getOptions()} />
            </div>);
    }

    getSelectedValue() {
        if (this.state.value === null) {
            return '';
        }
        console.log(this.state.value);
        return this.state.value.getIn(['attributes', 'name'])
    }

    getSelectedId() {
        if (this.state.value === null) {
            return '';
        }
        return this.state.value.get('id')
    }

    onMouseEnter = () => {
        this.setState({
            hovered: true
        })
    }

    onMouseLeave = () => {
        this.setState({
            hovered: false
        })
    }

    onSelect = (item) => {
        console.log('on select');
        this.setState({
            value: item,
            search: '',
            expanded: false
        })
    }

    onChange = (e) => {
        console.log('on change');
        this.setState({
            search: e.target.value
        })
    }

    /**
     * Get options
     * @returns {any|T|*}
     */
    getOptions = () => {
        return this.props.form.props.provider.getIn(['dataset', 'include', this.props.name])
    }

    onFocus = () => {
        console.log('on focus');
        this.setState({
            expanded: true
        })
    }

    onBlur = (e) => {
        if (this.state.hovered) {
            return true;
        }
        this.setState({
            expanded: false
        })
    }

    onToggle = (e) => {
        console.log('on toggle');
        this.setState({
            expanded: !this.state.expanded,
        })
    }
}