import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';

export default class DataPager extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            offset: DataPager.const.DEFAULT_OFFSET,
            limit: this.props.limit !== undefined ? this.props.limit : DataPager.const.DEFAULT_LIMIT
        }
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (<div>Ololo</div>)
    }
}


DataPager.const = {
    DEFAULT_LIMIT:  5,
    DEFAULT_OFFSET: 0,
}
