import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import Modal from '../Modal';
import Button from '../../controls/Button';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ModalDialog extends CoreComponent {

    render() {
        return (
            <Modal order="20" top="-20%" width="450px" visible={this.props.visible} key="1">
                <Modal.Header>{this.getProp('title')}</Modal.Header>
                <Modal.Body >
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onConfirm} color="positive" icon="check">Yes</Button>
                    <Button onClick={this.props.onCancel} color="negative" icon="remove">No</Button>
                </Modal.Footer>
            </Modal>)
    }
}