import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import Modal from '../Modal';
import Button from '../../controls/Button';

export default class ModalDetails extends CoreComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={true}>
                <Modal.Header>{this.getProp('title')}</Modal.Header>
                <Modal.Body >
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.onDelete ? <Button position="left" color="negative" icon="trash">Delete</Button> : null}
                    {this.props.onClose ? <Button icon="remove">Close</Button> : null}
                    {this.props.onSave ? <Button color="positive" icon="checkmark">Save</Button> : null}
                </Modal.Footer>
            </Modal>
        )
    }
}