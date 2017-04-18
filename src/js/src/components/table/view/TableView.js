import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import PagerView from './PagerView';

export default class TableView extends CoreComponent {

    getElementClass() {
        return "ui celled table sortable small";
    }

    render() {
        console.log('IS FETCHING');
        console.log(this.props.isFetching);

        let className = "ui inverted dimmer transition ";
        if (this.props.isFetching === true) {
            className = className + "active visible";
        }

        return (
            <div className="ui dimmable dimmed">
                <div className={className}>
                    <div className="ui text loader">Loading</div>
                </div>
                <table className={this.getClass()}>
                <thead>
                <tr><th>Header</th>
                    <th className="sorted descending">Header</th>
                    <th>Header</th>
                </tr></thead>
                <tbody>
                <tr>
                    <td>
                        Cell
                    </td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                <tr>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                <tr>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan="3">
                        <PagerView />
                    </th>
                </tr>
                </tfoot>
            </table>
            </div>
        )
    }
}