import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import PagerView from './PagerView';

export default class TableView extends CoreComponent {

    getElementClass() {
        return "ui celled table sortable small";
    }

    render() {
        return (
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
        )
    }
}