import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Body from './ModalBody';
import Header from './ModalHeader';
import Footer from './ModalFooter';
import Dimmer from './ModalDimmer';
import Loader from '../loader/Loader';

export default class Modal extends CoreComponent {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    /**
     * Update state
     * @param props
     */
    updateState(props) {
        this.setState({
            visible: props.visible
        });
    }

    /**
     * Set state visibility
     */
    componentDidMount() {
        this.updateState(this.props);
    }

    /**
     * On props update
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    hideModal = (e) => {
        if (this.props.loading) {
            return true;
        }

        if (this.props.onClose !== undefined) {
            this.props.onClose();
        }

        this.setState({
            visible: false
        });
    }

    buildClass() {
        super.buildClass();
        this.state.visible ?
            this.addClass("ui dimmer modals page transition visible active animating fade in") :
            this.addClass("ui dimmer modals page transition")
    }

    render = () => (
        <Dimmer visible={this.props.visible}>
            <div className="ui standard test modal transition visible active"
                 style={{marginTop: '-234px', display: 'block !important'}}>
                <div className="header">
                    Select a Photo
                </div>
                <div className="image content">
                    <div className="ui medium image">
                        <img src="https://semantic-ui.com/images/avatar2/large/rachel.png" />
                    </div>
                    <div className="description">
                        <div className="ui header">Default Profile Image</div>
                        <p>We've found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a>
                            image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button">
                        Nope
                    </div>
                    <div className="ui positive right labeled icon button">
                        Yep, that's me
                        <i className="checkmark icon" />
                    </div>
                </div>
            </div>
        </Dimmer>
);

render1() {
    return (<div onClick={this.hideModal} className={this.getClass()}>
    <div onClick={this.stopPropagate} className="ui animating drop in transition small second coupled modal visible  active transition-height" style={{top: 20 + '%'}} >
    {this.props.children}
    <Loader visible={this.props.loading} />
    </div>
    </div>)
}
}

Modal.Header = Header;
Modal.Footer = Footer;
Modal.Body = Body;