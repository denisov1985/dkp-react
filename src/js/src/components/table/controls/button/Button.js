import React, {Component} from 'react'
import CoreButton from '../../../button/Button';

export default class Button extends CoreButton {
    buildClass() {
        super.buildClass();
        let loading = false;
        for (let i in this.props.record.status) {
            if(this.props.record.status[i] === 1) {
                loading = true;
                break;
            }
        }
        if (loading) {
            this.addDisabled();
        }

        if (this.props.condition !== undefined) {
            this.props.condition(this);
        }
    }

    isLoading() {
        return this.props.record.status[this.getProp('type', 'default')] === 1;
    }
}