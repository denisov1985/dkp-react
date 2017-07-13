import React, {Component} from 'react'
import Breadcrumbs  from 'react-breadcrumbs'
import Navigation from 'components/navbar/Navigation'

export default class Layout extends Component {

    /**
     * Update page title
     */
    componentWillMount() {
        window.document.title = this.props.title || 'ISM Admin';

        if (!this.props.loggedIn) {
            //this.props.router.push('/login');
            return false;
        }
    }

    /**
     * Render layout
     * @returns {XML}
     */
    render() {
        console.log(this);
        const routes = this.props.router.routes[0].childRoutes;
        let routeData = [];

        for(let i in routes) {
            routeData.push({
                name: routes[i].name,
                path: routes[i].path
            })
        }
        console.log(routeData);

        return (
            <div>
                <Navigation router={this.props.router}>
                    <Navigation.Item key="-1" active={this.props.router.location.pathname === '/'} root={true} path="/">Главная</Navigation.Item>

                    {routes.map((route, index) => {
                        console.log(route.path)
                        console.log(this.props.router.isActive(route.path))
                        console.log('')
                        return (<Navigation.Group active={this.props.router.isActive(route.path)} key={index} path={route.path}  title={route.name}>
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
                        routes={this.props.router.routes}
                        params={this.props.router.params}
                    />

                    {this.props.children}
                </div>
            </div>
        )
    }

}