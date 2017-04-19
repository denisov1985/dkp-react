import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';
import Button from '../button/Button';
import Body from './Body';
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

    renderContent = () => {
        return (
            <div onClick={this.onModalClick} className="ui animating drop in transition small second coupled modal visible  active transition-height" style={{top: 20 + '%'}} >
                <div className="header">
                    Modal #2
                </div>
                <Loader visible={this.props.isFetching} />
                <Body>lalala</Body>
                <div className="actions">
                    <Button position="left" color="negative" icon="trash">Delete</Button>
                    <Button icon="remove">Cancel</Button>
                    <Button color="positive" icon="checkmark">Save</Button>
                </div>
            </div>
        );
    }

    renderData = () => {
        return (<form className="ui form">
            <div className="field">
                <label>First Name</label>
                <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
                <label>Last Name</label>
                <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
                <div className="ui checkbox">
                    <input type="checkbox" tabindex="0" className="hidden" />
                        <label>I agree to the Terms and Conditions</label>
                </div>
            </div>
        </form>);
    }

    renderLoading = () => {
        if (!this.props.isFetching) {
            return null;
        }
        return (<div style={{
            borderTopLeftRadius: 4 + 'px',
            borderTopRightRadius: 4 + 'px',
            borderBottomLeftRadius: 4 + 'px',
            borderBottomRightRadius: 4 + 'px',
        }} className="ui inverted dimmer transition visible active">
            <div className="ui text loader">Loading</div>
        </div>);
    }

    hideModal = (e) => {
        if (this.props.isFetching) {
            return true;
        }
        this.setState({
            isVisible: false
        });
    }

    onModalClick = (e) => {
        console.log('on modal click');
        e.stopPropagation();
    }

    render() {
        console.log('MODAL');
        console.log(this.props);
        let className = this.state.isVisible ? "ui dimmer modals page transition visible active animating fade in" : "ui dimmer modals page transition";
        return (<div onClick={this.hideModal} className={className}>
            {this.renderContent()}
        </div>)
    }
}