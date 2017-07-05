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
     * Class constructor
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
     * Common class logic
     */
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

    /**
     * Common style logic
     */
    buildStyle() {
        if (this.state.expanded) {
            this.addStyle('zIndex', 2000)
        }
    }

    /**
     * Update fields
     * @TODO Maybe better to move it to redux
     * @param item
     */
    updateFormState(item) {
        if (item !== null) {
            this.props.form.setState({
                data: this.props.form.state.data
                    .updateIn([
                        'fields', this.props.field.replace('.', '_')
                    ], field => item.get('id'))
            });
        }
    }

    /**
     * Get initial value
     * Required if dropdown has initial value
     */
    getInitialValue() {
        return this.props.form.props.provider
            .getIn(['dataset', 'include', this.props.name])
            .filter(record => record.get('id') == this.getValue())
            .get(0, null);
    }

    /**
     * Returns selected value
     * @returns {*}
     */
    getSelectedValue() {
        if (this.state.value === null) {
            return '';
        }
        return this.state.value.getIn(['attributes', 'name'])
    }

    /**
     * On select item
     * Close menu and empty search and set selected item to state
     * @param item
     */
    onSelect = (item) => {
        this.setState({
            value: item,
            search: '',
            expanded: false
        });
        this.updateFormState(item)
    }

    /**
     * On search change
     * @param e
     */
    onChange = (e) => {
        this.setState({
            search: e.target.value
        })
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
     * On search focus
     */
    onFocus = () => {
        this.setState({
            expanded: true
        })
    }

    /**
     * On search blur
     * Do not fire if mouse under menu list
     * @param e
     * @returns {boolean}
     */
    onBlur = (e) => {
        if (this.state.hovered) {
            return true;
        }
        this.setState({
            expanded: false
        })
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
            return this.props.form.props.provider
                .getIn(['dataset', 'include', this.props.name])
                .filter(record => record.getIn(['attributes', this.getProp('refColumn')]) == id)
        }   else  {
            return this.props.form.props.provider
                .getIn(['dataset', 'include', this.props.name])
        }

    }

    /**
     * Empty search value and search if reference value has changes
     * @param nextProps
     * @returns {boolean}
     */
    componentWillReceiveProps(nextProps) {
        if (this.getProp('refColumn')) {
            const fields = nextProps.form.state.data.get('fields');
            if (typeof fields === 'undefined') {
                return true;
            }
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
     * Render element
     * @TODO replace input ane icon to components
     * @returns {XML}
     */
    render() {
        return (
            <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={this.getClass()} style={this.getStyle()}>
                <i className="dropdown icon" onClick={this.onToggle}/>
                <input value={this.state.search} className="search" onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} />
                <SearchText search={this.state.search}>{this.getSelectedValue()}</SearchText>
                <Menu
                    selected={this.state.value}
                    onSelect={this.onSelect}
                    search={this.state.search}
                    visible={this.state.expanded}
                    options={this.getOptions()} />
            </div>);
    }
}