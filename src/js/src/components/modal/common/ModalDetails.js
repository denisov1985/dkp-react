import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import Modal from '../Modal';
import Button from '../../controls/Button';

export default class ModalDetails extends CoreComponent {

    constructor(props) {
        super(props);
    }

    onClose = (e) => {
        e.stopPropagation();
        this.props.onClose();
    }

    renderModal() {
        return (
           <Modal visible={this.props.details.status === 2} onClose={this.props.onClose}>
                <Modal.Header>{this.getProp('title')}</Modal.Header>
                <Modal.Body >
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.onDelete ? <Button position="left" color="negative" icon="trash">Delete</Button> : null}
                    <Button  onClick={this.onClose} icon="remove">Close</Button>
                    {this.props.onSave ? <Button color="positive" icon="checkmark">Save</Button> : null}
                </Modal.Footer>
            </Modal>

        )
    }

    renderLoading() {
        return (<Modal visible={true} onClose={this.props.onClose}>
            <div style={{
                borderRadius: '0.28571429rem',
                zIndex: '9999999999999'
            }} className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
            </div>
            <div style={{height: '100px'}}></div>
        </Modal>);
    }

    render() {
        if (this.props.details.status === 0) {
            return null;
        }
        if (this.props.details.status === 1) {
            return this.renderLoading();
        }
        return this.renderModal();
    }
}