import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Body from './ModalBody';
import Header from './ModalHeader';
import Footer from './ModalFooter';
import Dimmer from './ModalDimmer';

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

    /**
     * Hide modal
     * @param e
     * @returns {boolean}
     */
    hideModal = () => {
        if (this.props.loading) {
            return true;
        }

        if (this.props.onClose !== undefined) {
            this.props.onClose();
        }

        this.setState({
            visible: false
        });
    };

    /**
     * Build class
     */
    buildClass() {
        super.buildClass();
        // ui animating drop in transition small second coupled active transition-height
        this.addClass("ui  animating drop in test modal transition small");
        if (this.state.visible) {
            this.addClass("visible active")
        }
    }

    /**
     * Build style
     */
    buildStyle() {
        if (this.props.visible) {
            this.addStyle('display', 'block !important');
            this.addStyle('marginTop', '-320px')
        }
    }

    /**
     * Render
     */
    render = () => (
        <Dimmer visible={this.state.visible} onClick={this.hideModal}>
            <div onClick={this.stopPropagate} className={this.getClass()} style={this.getStyle()}>
                {this.props.children}
            </div>
        </Dimmer>
    );

}

Modal.Header = Header;
Modal.Footer = Footer;
Modal.Body = Body;