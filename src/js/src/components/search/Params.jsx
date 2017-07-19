import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

class Params extends CoreComponent {

    onClose = (e) => {
        e.stopPropagation();
        this.props.onClose(this.props.index);
    }

    /**
     * Render item
     * @returns {XML}
     */
    render() {
        return (
            <a className="ui label transition visible" style={{display: 'inline-block !important'}}>
                {this.props.item.field.value} {this.props.item.operator.value} {this.props.item.value.value}
                <i onClick={this.onClose} className="delete icon"/>
            </a>
        )
    }

}

export default Params;