import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataTablePager extends CoreComponent {

    setPage = (number) => {
        this.props.parent.request({
            page: {
                offset: 7,
                limit: 10
            }
        })
    }

    render() {
        return (<div className="ui right floated pagination menu">
            <a className="icon item">
                <i className="left chevron icon"></i>
            </a>
            <a className="item">1</a>
            <a onClick={this.setPage.bind(this, 2)} className="item">2</a>
            <a className="item">3</a>
            <a className="item">4</a>
            <a className="icon item">
                <i className="right chevron icon"></i>
            </a>
        </div>);
    }
}