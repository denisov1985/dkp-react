import React, {Component} from 'react'
import Menu from '../components/menu/Menu';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Link from '../router/Link';

export default class Layout extends Component {

    componentWillMount() {
        window.document.title = this.props.title;
    }

    render() {
        return (
            <div className="app-layout">
                <Menu itemTitle="title" itemData="route" items={this.props.router.routes[0].children} ><Link /></Menu>
                <div style={{
                    marginRight: 14 + 'px',
                    marginLeft: 14 + 'px',
                }} className="ui">
                    <Breadcrumbs router={this.props.router} />

                    {this.props.children}
                </div>
            </div>
        )
    }

}