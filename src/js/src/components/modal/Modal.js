import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
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
        let defaultAnimation = this.props.animation ? this.props.animation : 'drop';
        this.addClass("ui  animating test modal transition small");
        this.addClass(defaultAnimation);
        if (this.state.visible) {
            this.addClass("visible active")
            this.addClass("in")
        }   else  {
            this.addClass("out")
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
        this.props.order ? this.addStyle('zIndex', (this.props.order * 1000) + 1) : this.addStyle('zIndex', 1001)
        if (this.props.width) {
            this.addStyle('width', this.props.width);
            this.addStyle('marginLeft', '-220px')
        }

        if (this.props.top) {
            this.addStyle('marginTop', this.props.top)
        }
    }

    /**
     * Render
     */
    render = () => (
        <Dimmer order={this.props.order} visible={this.state.visible} onClick={this.hideModal}>
            <div onClick={this.stopPropagate} className={this.getClass()} style={this.getStyle()}>
                {this.props.children}
            </div>
        </Dimmer>
    );

}

Modal.Header = Header;
Modal.Footer = Footer;
Modal.Body = Body;