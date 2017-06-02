import React, {Component} from 'react'
import Checkbox from '../../controls/Checkbox';

export default class DataCheckbox extends Checkbox {

    /**
     * On Change
     */
    onChange = () => {
        console.log('Yes');
    }

}