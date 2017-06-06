import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataPager extends CoreComponent {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            offset: DataPager.const.DEFAULT_OFFSET,
            limit: this.props.limit !== undefined ? this.props.limit : DataPager.const.DEFAULT_LIMIT
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.offset !== this.state.offset) {
            this.props.parent.setState({
                min: this.state.offset * this.state.limit,
                max: this.state.offset * this.state.limit + this.state.limit
            })
        }
    }

    /**
     * Update parent state
     */
    componentWillMount() {
        this.props.parent.setState({
            min: 0,
            max: this.state.limit
        })
    }

    /**
     * Get pages count
     * @returns {number}
     */
    getPagesCount() {
        return Math.ceil(this.props.parent.getDataset(true).length / this.state.limit);
    }

    /**
     * Render item helper
     * @param val
     * @returns {XML}
     */
    renderItem(val, index) {
        if (typeof index === 'undefined') {
            index = val;
        }
        let className = "item";
        let style = {};
        (this.state.offset === val - 1) && (className += ' active') && (style = {color: 'rgba(40, 40, 40, 0.3)' });
        return (<a key={index} style={style} onClick={this.onItemClick.bind(this, val)} className={className}>{val}</a>);
    }

    /**
     * Render arrow helper
     * @param direction
     * @returns {XML}
     */
    renderArrow(direction, val) {

        let className = direction + " chevron icon";
        let linkClassName = "icon item";

        if (this.state.offset === 0 && direction === 'left') {
            linkClassName += ' disabled';
        }
        if (this.state.offset === this.getPagesCount() - 1 && direction === 'right') {
            linkClassName += ' disabled';
        }

        return (<a onClick={this.onItemClick.bind(this, val)} className={linkClassName}>
            <i className={className}></i>
        </a>)
    };

    /**
     * Render previous arrow helper
     * @returns {XML}
     */
    renderPrevious() {
        return this.renderArrow('left', 1);
    };

    /**
     * Render next arrow helper
     * @returns {XML}
     */
    renderNext() {
        return this.renderArrow('right', this.getPagesCount());
    };

    /**
     * On pager item click
     */
    onItemClick(page) {
        if (page < 1 || page > this.getPagesCount()) {
            return false;
        }
        this.setState({
            offset: page -  1
        })
    }

    /**
     * Get pages buttons
     * @returns {Array}
     */
    getPages = () => {
        let pageStart = this.state.offset - DataPager.const.DEFAULT_BUTTONS_OFFSET;
        let pageEnd   = this.state.offset + DataPager.const.DEFAULT_BUTTONS_OFFSET;
        let pages = [];
        if (pageStart < 0) {
            let offset = 0 - pageStart;
            pageStart = 0;
            pageEnd = pageEnd + offset;
        }
        if (pageEnd > this.getPagesCount() - 1) {
            pageEnd = this.getPagesCount() - 1;
        }
        for (let i = pageStart; i <= pageEnd; i++) {
            pages[i] = i + 1;
        }
        return pages
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
         <div className="ui right floated pagination menu">
            {this.renderPrevious()}
            {this.getPages().map((page, index) => this.renderItem(page, index))}
            {this.renderNext()}
        </div>)
    }
}


DataPager.const = {
    DEFAULT_LIMIT: 5,
    DEFAULT_OFFSET: 0,
    DEFAULT_BUTTONS_OFFSET: 2
}
