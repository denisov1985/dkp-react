import React, {Component} from 'react'
import { fromJS, Map, List } from 'immutable';
import Element from '../Element';
import Menu from './Menu';
import SearchText from './SearchText';

/**
 * @TODO Refactor referenced fields
 */
export default class Dropdown extends Element {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: this.getInitialValue(),
            search: '',
            hovered: false
        }
    }

    /**
     * Get initial value
     */
    getInitialValue() {
        const id = this.getValue();
        const data = this.props.form.props.provider.getIn(['dataset', 'include', this.props.name]).filter(record => record.get('id') == id);
        return data.get(0, null);
    }

    buildClass() {
        this.addClass("ui search dropdown selection visible");
        if (this.state.expanded) {
            this.addClass('active');
        }

        let options = this.getOptions();
        if (options.length === 0) {
            this.addClass('disabled');
        }
    }

    buildStyle() {
        if (this.state.expanded) {
            this.addStyle('zIndex', 2000)
        }
    }

    render() {
        console.log('render ' + this.props.name);
        console.log(this);
        return (
            <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={this.getClass()} style={this.getStyle()}>
                <i className="dropdown icon" onClick={this.onToggle}/>
                <input value={this.state.search} className="search" onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} />
                <SearchText search={this.state.search}>{this.getSelectedValue()}</SearchText>
                <Menu
                    expanded={this.state.expanded}
                    selected={this.state.value}
                    onSelect={this.onSelect}
                    search={this.state.search}
                    visible={this.state.expanded}
                    options={this.getOptions()} />
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
        console.log(item);
        this.setState({
            value: item,
            search: '',
            expanded: false
        });
        this.updateFormState(item)
    }

    updateFormState(item) {
        const data = this.props.form.state.data;
        if (item !== null) {
            this.props.form.setState({
                data: data.updateIn(['fields', this.props.field.replace('.', '_')], field => item.get('id'))
            });
        }
    }

    onChange = (e) => {
        console.log('on change');
        this.setState({
            search: e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.getProp('refColumn')) {
            const fields = nextProps.form.state.data.get('fields');
            if (typeof fields === 'undefined') {
                return true;
            }
            // if changed parent empty child
            const id = fields.get(this.getProp('refColumn'));
            if (this.state.value !== null) {
                let oldRefId = this.state.value.getIn(['attributes', this.getProp('refColumn')]);
                if (oldRefId != id) {
                    this.setState({
                        value: null
                    })
                }
            }
        }
    }

    /**
     * Get options
     * @returns {any|T|*}
     */
    getOptions = () => {
        if (this.getProp('refColumn')) {
            const fields = this.props.form.state.data.get('fields');
            if (typeof fields === 'undefined') {
                return [];
            }
            const id = fields.get(this.getProp('refColumn'));
            return this.props.form.props.provider.getIn(['dataset', 'include', this.props.name]).filter(record => record.getIn(['attributes', this.getProp('refColumn')]) == id)
        }   else  {
            return this.props.form.props.provider.getIn(['dataset', 'include', this.props.name])
        }

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