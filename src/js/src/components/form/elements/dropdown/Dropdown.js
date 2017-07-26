import React, {Component} from 'react'
import { fromJS, Map, List } from 'immutable';
import Element from '../Element';
import Menu from './Menu';
import SearchText from './SearchText';
import Icon from 'components/icon/Icon';

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
        if (options.size === 0) {
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
            let state = this.props.form.state.data;
            let fieldParts = this.props.field.split('.');
            if (state.getIn(['fields', fieldParts[0]]) === null) {
                state = state.setIn(['fields', fieldParts[0]], new Map({}))
            }
            state = state.setIn(['fields'].concat(this.props.field.split('.')), item.get('id'));
            this.props.form.setState({
                data: state
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

        if (this.props.virtual !== true) {
            this.props.form.props.handler(this.props.name, item.get('attributes'));
        }
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
            const id = fields.getIn(this.getProp('refColumn').split('.'));

            let columnParts = this.getProp('refColumn').split('.');
            let column = [];
            column.push(columnParts[columnParts.length - 2]);
            column.push(columnParts[columnParts.length - 1]);

            return this.props.form.props.provider
                .getIn(['dataset', 'include', this.props.name])
                .filter(record => {
                    return record.getIn(['attributes'].concat(column)) == id;
                })
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
        if (typeof nextProps.refColumn === 'undefined') {
            return true;
        }
        if (this.state.value === null) {
            return true;
        }
        let referenceId = nextProps.form.state.data.getIn(['fields'].concat(nextProps.refColumn.split('.')));
        let currentId   = this.state.value.getIn(['attributes', 'id']);

        if (typeof currentId === 'undefined') {
            return true;
        }

        if (currentId != referenceId) {
            this.setState({
                value: null,
                search: '',
                expanded: false
            });
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
                <Icon icon="dropdown" onClick={this.onToggle}/>
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