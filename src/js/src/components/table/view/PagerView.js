import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class PagerView extends CoreComponent {

    getTable() {
        return this.props.table;
    }

    nextPage = (e) => {
        e.preventDefault();
        this.getTable().setState(Object.assign({}, this.getTable().state, {
            offset: this.getTable().state.offset + 1
        }));
    }

    prevPage = (e) => {
        e.preventDefault();
        this.getTable().setState(Object.assign({}, this.getTable().state, {
            offset: this.getTable().state.offset - 1
        }));
    }

    setPage = (e) => {
        e.preventDefault();
        this.getTable().setState(Object.assign({}, this.getTable().state, {
            offset: parseInt(e.target.text) - 1
        }));
    }

    getPages = () => {
        let pageOffset = 2;
        let pageStart = this.getTable().state.offset - pageOffset;
        let pageEnd = this.getTable().state.offset + pageOffset;
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
            pages[i] = {
                index: i + 1,
                active: this.getTable().state.offset === i
            };
        }
        return pages
    }

    getPagesCount() {
        return Math.ceil(this.getTable().getDataset().length / this.getTable().state.limit);
    }

    /**
     * Render previous button
     * @returns {XML}
     */
    renderPrevButton = () => {
        if (this.getTable().state.offset > 0) {
            return (<a href="#" className="icon item" onClick={this.prevPage}>
                    <i className="left chevron icon"></i>
                </a>);
        }   else  {
            return (<span href="#" className="icon item disabled">
                <i className="left chevron icon"></i>
            </span>);
        }
    }

    /**
     * Render next button
     * @returns {XML}
     */
    renderNextButton = () => {
        if (this.getTable().state.offset < this.getPagesCount() - 1) {
            return (<a href="#" className="icon item" onClick={this.nextPage}>
                <i className="right chevron icon"></i>
            </a>);
        }   else  {
            return (<span href="#" className="icon item disabled">
                <i className="right chevron icon"></i>
            </span>);
        }
    }

    render() {
        return (
            <div className="ui right floated pagination menu small">
                {this.renderPrevButton()}
                {this.getPages().map((page, index) => {
                    return (<a key={index}
                        className={page.active ? 'item active' : 'item'}
                        onClick={this.setPage}
                        href="#">
                            {page.index}
                        </a>);
                })}
                {this.renderNextButton()}

            </div>
        )
    }
}