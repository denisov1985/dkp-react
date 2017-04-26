import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Button from '../button/Button';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import Loader from '../loader/Loader';

export default class Modal extends CoreComponent {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
    }

    componentDidMount() {
        this.setState({
            isVisible: this.props.isVisible
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isVisible: nextProps.isVisible
        });
    }

    hideModal = (e) => {
        if (this.props.isFetching) {
            return true;
        }

        if (this.props.onClose !== undefined) {
            this.props.onClose();
        }

        this.setState({
            isVisible: false
        });
    }

    render() {

        console.log('MODAL');
        console.log(this.props);

        let className = this.state.isVisible ? "ui dimmer modals page transition visible active animating fade in" : "ui dimmer modals page transition";
        return (<div onClick={this.hideModal} className={className}>
            <div onClick={this.stopPropagate} className="ui animating drop in transition small second coupled modal visible  active transition-height" style={{top: 20 + '%'}} >
                {this.props.children}
                <Loader visible={this.props.isFetching} />
            </div>
        </div>)
    }
}

Modal.Header = Header;
Modal.Footer = Footer;
Modal.Body = Body;