import React, {Component} from 'react'
import Menu from '../components/menu/Menu';

export default class Layout extends Component {

    componentWillMount() {
        window.document.title = this.props.title;
    }

    render() {

        console.log(this.props);

        return (
            <div className="app-layout">

                <Menu items={this.props.router.routes[0].children} />

                <div className="ui container">
                    <div className="ui breadcrumb">
                        <a className="section">Home</a>
                        <i className="right angle icon divider"></i>
                        <a className="section">Store</a>
                        <i className="right angle icon divider"></i>
                        <div className="active section">T-Shirt</div>
                    </div>
                {this.props.children}
                </div>
            </div>
        )
    }

}