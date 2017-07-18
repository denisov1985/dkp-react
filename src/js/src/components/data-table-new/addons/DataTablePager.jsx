import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataTablePager extends CoreComponent {

    /**
     * Set new page via Redux
     * @param number
     */
    setPage = (number) => {
        this.props.parent.update(
            this.props.parent.props.provider.setIn(['page', 'offset'], number)
        );
    }

    /**
     * Get page object
     */
    getPage() {
        return this.props.parent.props.provider.get('page');
    }

    /**
     * Get limit
     */
    getLimit() {
        return this.getPage().get('limit', 0);
    }

    /**
     * Get offset
     */
    getOffset() {
        return this.getPage().get('offset', 0);
    }

    /**
     * Get total records number
     */
    getTotal() {
        return this.getPage().get('total', 0);
    }

    /**
     * Get max page count
     * @returns {number}
     */
    getMaxPage() {
        let total  = this.getTotal();
        let limit  = this.getLimit();
        return (total > 0) ? Math.ceil(total / limit) : 0;
    }

    getPages() {
        let limit  = this.getLimit();
        let offset = this.getOffset();
        let total  = this.getTotal();

        let size      = 2;
        let pageStart = offset - size;
        let pageEnd   = offset + size + 1;

        let maxPages  = this.getMaxPage();

        if (pageStart < size) {
            pageEnd   = size * 2 + 2;
            pageStart = 1;
        }

        if (pageEnd > maxPages) {
            pageStart = maxPages - (size * 2);
            pageEnd   = maxPages + 1;
        }

        let pages = [];
        for (let i = pageStart; i < pageEnd; i++) {
            pages.push(i);
        }
        return pages;
    }

    renderPages() {
        const pages = this.getPages();
        return pages.map((page, index) => {
            let className = "item";
            if (page == this.getOffset()) {
                className += ' disabled';
            }
            return (<a key={index} onClick={this.setPage.bind(this, page)} className={className}>{page}</a>)
        })
    }

    render() {
        if (this.getTotal() == 0) {
            return null;
        }

        let firstClass = "icon item";
        let lastClass  = "icon item";

        if (this.getOffset() == 1) {
            firstClass += ' disabled';
        }

        if (this.getOffset() == this.getMaxPage()) {
            lastClass += ' disabled';
        }

        return (<div className="ui right floated pagination menu">
            <a onClick={this.setPage.bind(this, 1)} className={firstClass}>
                <i className="left chevron icon"></i>
            </a>
            {this.renderPages()}
            <a onClick={this.setPage.bind(this, this.getMaxPage())} className={lastClass}>
                <i className="right chevron icon"></i>
            </a>
        </div>);
    }
}
