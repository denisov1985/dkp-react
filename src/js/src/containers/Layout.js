import React, {Component} from 'react'
import Breadcrumbs  from 'react-breadcrumbs'
import Navigation from 'components/navbar/Navigation'

export default class Layout extends Component {

    /**
     * Update page title
     */
    componentWillMount() {
        window.document.title = this.props.title || 'ISM Admin';

        //if (!this.isLoggedIn()) {
            //this.props.router.push('/login');
            //return false;
        //}
    }

    isLoggedIn = () => {
        return this.props.container.isLoggedIn();
    }

    getRouter = () => this.props.container.props.router

    /**
     * Render layout
     * @returns {XML}
     */
    render() {
        const routes = this.getRouter().routes[0].childRoutes;
        return (
            <div>
                <Navigation router={this.getRouter()}>
                    <Navigation.Item key="-1" active={this.getRouter().location.pathname === '/'} root={true} path="/">Главная</Navigation.Item>

                    {routes.map((route, index) => {
                        return (<Navigation.Group active={this.getRouter().isActive(route.path)} key={index} path={route.path}  title={route.name}>
                            {route.childRoutes.map((r, i) => {
                                let path = '/' + route.path + '/' + r.path;
                                return (<Navigation.Item key={i} path={path}>{r.name}</Navigation.Item>)
                            })}
                        </Navigation.Group>);
                    })}

                    {this.props.loggedIn ?
                        <Navigation.Item align="right" path="/logout">Выход</Navigation.Item> :
                        <Navigation.Item align="right" path="/login">Вход</Navigation.Item>}
                </Navigation>

                <div style={{marginLeft:  '14px', marginRight: '14px'}}>
                    <Breadcrumbs
                        separator={<i className="right angle icon divider"/>}
                        wrapperClass="ui breadcrumb"
                        routes={this.getRouter().routes}
                        params={this.getRouter().params}
                    />

                    <h2 className="ui header">
                        {this.props.container.props.route.name}
                        <div className="sub header">{this.props.description}</div>
                    </h2>

                    {this.props.children}
                </div>
            </div>
        )
    }

}