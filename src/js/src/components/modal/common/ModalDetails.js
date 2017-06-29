import React, {Component} from 'react'
import CoreComponent from '../../core/CoreComponent';
import Modal from '../Modal';
import ModalDialog from './ModalDialog';
import Button from '../../controls/Button';

export default class ModalDetails extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteConfirm: false
        }
    }

    onClose = (e) => {
        e.stopPropagation();
        this.props.onClose();
    }

    onSave = (e) => {
        e.stopPropagation();
        this.props.onSave();
    }

    onDelete = (e) => {
        e.stopPropagation();
        this.setState({
            showDeleteConfirm: true
        })
    }

    onDialogConfirm = () => {
        this.setState({
            showDeleteConfirm: false
        })
        this.props.onDelete();
    }

    onDialogCancel = () => {
        this.setState({
            showDeleteConfirm: false
        })
    }

    renderModal() {
        const status = {
            details: this.props.provider.details.get('status'),
            update: 0,
            delete: 0,
        }

        return (<div>{this.showDeleteConfirm()}
           <Modal order="1" animation="none" key="1" visible={status.details === 2} onClose={this.props.onClose}>
                <Modal.Header>{this.getProp('title', 'Modal Dialog')}</Modal.Header>
                <Modal.Body >
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={status.update === 1}
                            loading={status.delete === 1}
                            onClick={this.onDelete}
                            position="left"
                            color="negative"
                            icon="trash">Delete</Button>
                    <Button onClick={this.onClose} icon="remove">Close</Button>
                    <Button disabled={status.delete === 1} loading={status.update === 1} onClick={this.onSave} color="positive" icon="checkmark">Save</Button>
                </Modal.Footer>
            </Modal>
            </div>
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

    showDeleteConfirm = () => {
        return (<ModalDialog
            onConfirm={this.onDialogConfirm}
            onCancel={this.onDialogCancel}
            visible={this.state.showDeleteConfirm}
            title="Are you sure want to delete?" />)
    }

    render() {
        const status = this.props.provider.details.get('status');
        if (status === 0) {
            return null;
        }
        if (status === 1) {
            return this.renderLoading();
        }
        return this.renderModal();
    }
}