import React, {Component} from 'react'
import SaveButton from '../../../../components/button/SaveButton';

export default class ActiveButton extends SaveButton {

    proccessDisabled() {

        if (this.props.record.is_active) {
            this.addClass('disabled');
        }

    }

}

ActiveButton.defaultProps = {
    type: 'active'
};