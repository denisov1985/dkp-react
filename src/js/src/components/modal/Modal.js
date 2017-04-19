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
        return (<div  onClick={this.onModalClick} className="ui small second coupled modal visible  active" style={{top: 20 + '%'}} >
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
            <div className="ui small second coupled modal visible  active" style={{top: 20 + '%'}} >
                <div className="ui inverted dimmer transition visible active">
                    <div className="ui text loader">Loading</div>
                </div>
                <div className="header">

                </div>
                <div className="content">
                    <div className="description">

                    </div>
                </div>
                <div className="actions">

                </div>
            </div>);
    }

    hideModal = (e) => {
        if (this.props.isFetchind) {
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
        let className = this.state.isVisible ? "ui dimmer modals page transition visible active" : "ui dimmer modals page transition";
        return (<div onClick={this.hideModal} className={className}>
            {this.props.isFetchind ? this.renderLoading() : this.renderContent()}
        </div>)
    }
}