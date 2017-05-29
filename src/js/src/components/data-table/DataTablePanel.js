import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import DataPager from './addons/DataPager';

export default class DataTablePanel extends CoreComponent {

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
        return (<div>
            ololo
        </div>)
    }
}

