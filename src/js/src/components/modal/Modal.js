import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

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

    renderContent() {
        return (<div onClick={this.onModalClick} className="ui animating drop in transition small second coupled modal visible  active" style={{top: 20 + '%'}} >
            <div className="header">
                Modal #2
            </div>
            <div className="content">
                <div className="description">
                    <p>That's everything!</p>
                </div>
            </div>
            <div className="actions">
                <div className="ui approve button">
                    <i className="checkmark icon"></i>
                    All Done
                </div>
            </div>
        </div>)
    }

    renderLoading() {
        return (
            <div className="ui animating drop in transition small second coupled modal visible  active" style={{top: 20 + '%'}} >
                <div className="header">

                </div>
                <div className="content">
                    <div className="description">
                        <div className="ui inverted dimmer transition visible active">
                            <div className="ui text loader">Loading</div>
                        </div>
                        asdasdsd
                    </div>
                </div>
                <div className="actions">

                </div>
            </div>);
    }

    renderContentTest = () => {
        return (
            <div onClick={this.onModalClick} className="ui animating drop in transition small second coupled modal visible  active transition-height" style={{
                top: 20 + '%'
            }} >

                <div className="header">
                    Modal #2
                </div>
                <div className="content">
                    <div className="description">
                        {this.renderLoadingTest()}
                        {this.renderData()}
                    </div>
                </div>
                <div className="actions">
                    <button style={{marginLeft: 0}} className="ui labeled icon button negative left floated">
                        <i className="trash outline icon"></i>
                        Delete
                    </button>

                    <button className="ui labeled icon button">
                        <i className="remove icon"></i>
                        Cancel
                    </button>

                    <button className="ui labeled icon button positive">
                        <i className="checkmark icon"></i>
                        Save
                    </button>
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

    renderLoadingTest = () => {
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
            {this.renderContentTest()}
        </div>)
    }
}