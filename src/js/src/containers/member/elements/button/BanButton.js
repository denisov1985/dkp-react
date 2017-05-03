import React, {Component} from 'react'
import SaveButton from '../../../../components/button/SaveButton';

export default class BanButton extends SaveButton {

    proccessDisabled() {
        if (!this.props.record.is_active) {
            this.addClass('disabled');
        }

    }

}

BanButton.defaultProps = {
    type: 'ban'
};