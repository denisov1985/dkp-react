import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataPager from './addons/DataPager';

export default class DataTableFooter extends CoreComponent {

    renderPager = () => {
        if (typeof this.props.parentProps.pagination === 'undefined') {
            return null;
        }
    }

    /**
     * Render view
     * @returns {XML}
     */
    render() {
        return (<tfoot>

        </tfoot>)
    }
}

