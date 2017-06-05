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
        this.addClass("ui standard test modal transition");
        if(this.state.visible) {
            this.addClass("visible active")
        }
    }

    buildStyle() {
        if (this.props.visible) {
            this.addStyle('display', 'block !important');
            this.addStyle('marginTop', '-234px')
        }
    }

    render = () => (
        <Dimmer visible={this.props.visible}>
            <div className={this.getClass()} style={this.buildStyle()}>
                {this.props.children}
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