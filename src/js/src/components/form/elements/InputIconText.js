import React, {Component} from 'react'
import InputText from './InputText';

export default class InputIconText extends InputText {
    render() {
        const iconClass = "icon " + this.props.icon;
        return (<div className="ui left icon input">
            {super.render()}
            <i className={iconClass} />
        </div>)
    }
}