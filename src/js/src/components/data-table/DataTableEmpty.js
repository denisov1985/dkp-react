import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class DataTableEmpty extends CoreComponent {

    /**
     * Render view
     * @returns {XML}
     */
    render() {

        let loadingClass = "ui dimmer";
        this.props.loading && (loadingClass += " visible active")

        return (<div className="ui center aligned segment">
            <div className={loadingClass}>
                <div className="content">
                    <div className="center">
                        <h2 className="ui inverted icon header">
                            <div className="ui text loader"></div>
                        </h2>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <p>No data</p>
            <br />
            <br />
        </div>)
    }
}

