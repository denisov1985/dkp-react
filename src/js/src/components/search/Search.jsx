import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Menu from './Menu';
import Params from './Params';

class Search extends CoreComponent {

    /**
     * Class constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            search: '',
            hovered: false,

            searchField: null,
            searchOperator: null,
            searchValue: null,

            searchParams: []
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.searchField !== null
            && nextState.searchOperator !== null
            && nextState.searchValue !== null) {
            let params = this.state.searchParams;
            params.push({
                field: nextState.searchField,
                operator: nextState.searchOperator,
                value: nextState.searchValue
            })
            this.setState({
                searchParams: params,
                searchField: null,
                searchOperator: null,
                searchValue: null,
                expanded: false
            }, () => {
                this.refs.search.blur();
                this.props.onSearch(this.state.searchParams);
            })
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
        super.buildClass();
        this.addClass('ui large fluid multiple search selection dropdown');
        if (this.state.expanded) {
            this.addClass('active visible');
        }
    }

    renderSearchField() {
        if (this.state.searchField === null) {
            return null;
        }
        return <span style={{
            display: 'inline-block !important',
            marginRight: 4 + 'px'
        }}>{this.state.searchField.value}</span>
    }

    renderSearchOperator() {
        if (this.state.searchOperator === null) {
            return null;
        }
        return <span style={{
            display: 'inline-block !important'
        }}>{this.state.searchOperator.value}</span>
    }

    onKeyPress = (e) => {
        const keyCode = e.which;
        if (keyCode === 13) {
            if (this.state.searchValue === null) {
                this.setState({
                    searchValue: {key: e.target.value, value: e.target.value},
                    search: ''
                });
                return true;
            }
        }
    }

    renderSearchParams() {
        return this.state.searchParams.map((item, index) => {
            return (<Params onClose={this.onCloseParam} item={item} index={index} />)
        })
    }

    onCloseParam = (index) => {
        this.setState({
            searchParams: this.state.searchParams.filter((item, key) => {
                return key != index
            })
        }, () => {
            this.props.onSearch(this.state.searchParams);
        })
    }

    /**
     * Render item
     * @returns {XML}
     */
    render() {
        return (
            <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={this.getClass()} onClick={this.onDropdownClick}>
                <input name="tags" type="hidden" defaultValue="angular,design"/>
                <i onClick={this.onToggle} className="dropdown icon"/>
                {this.renderSearchParams()}
                {this.renderSearchField()}
                {this.renderSearchOperator()}
                <input value={this.state.search} onKeyPress={this.onKeyPress} ref="search" onChange={this.onChange} className="search" autoComplete="off" tabIndex={0}/><span className="sizer" />
                <div className="default text"></div>
                <Menu
                    search={this.state.search}
                    onSelect={this.onSelect}
                    options={this.getOptions()}
                    visible={this.state.expanded} />
            </div>
        )
    }

    /**
     * On select item
     * Close menu and empty search and set selected item to state
     * @param item
     */
    onSelect = (item) => {
        if (this.state.searchField === null) {
            this.setState({
                searchField: item,
                search: ''
            });
            return true;
        }

        if (this.state.searchOperator === null) {
            this.setState({
                searchOperator: item,
                search: '',
                expanded: false
            });
            return true;
        }

        if (this.state.searchValue === null) {
            this.setState({
                searchValue: item,
                search: '',
                expanded: false
            });
            return true;
        }
    }

    getOptions() {
        if (this.state.searchField === null) {
            return this.getFieldOptions();
        }

        if (this.state.searchOperator === null) {
            return this.getOperatorOptions();
        }
        return [];
    }

    getFieldOptions() {
        return this.props.options;
    }

    getOperatorOptions() {
        return [
            {key: '=',  value: '='},
            {key: '!=', value: '!='},
            {key: '>', value: '>'},
            {key: '<', value: '<'},
        ]
    }

    /**
     * On dropdown click
     * @param e
     */
    onDropdownClick = (e) => {
        if (!this.state.expanded) {
            this.setState({
                expanded: true,
            })
        }
        this.refs.search.select();
    }

    /**
     * On toggle dropdown
     * @param e
     */
    onToggle = (e) => {
        e.stopPropagation();
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

    onChange = (e) => {
        this.setState({
            search: e.target.value
        })
        console.log(e.target.value)
    }
}

export default Search;