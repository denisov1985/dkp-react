import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class GetButton extends CoreComponent {

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.scope === undefined) {
            return true;
        }

        if (nextProps.scope.save.dataset.id !== nextProps.record.id) {
            return false;
        }

        return true;
    }

    proccessDisabled() {}

    buildClass() {
        super.buildClass();
        this.addClass('ui button');

        if (this.props.icon !== undefined) {
            this.addClass('icon');
        }

        if (this.props.children !== undefined) {
            this.addClass('labeled');
        }

        let save = this.props.scope.save;
        let del  = this.props.scope.delete;
        let get  = this.props.scope.get;

        this.proccessDisabled();
    }

    getDisabledState() {

    }

    render() {
        return (<button onClick={this.onClick} className={this.getClass()} type="button">{this.getIcon()}{this.props.children}</button>)
    }
}

SaveButton.defaultProps = {
    type: 'default'
};