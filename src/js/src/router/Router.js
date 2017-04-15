import React, {Component} from 'react'
import Route from './Route';

export default class Router extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        let root = [{
            title: 'Root',
            children: props.routes
        }];
        this.routes = this.buildRoots(root, null);
        let path = window.location.hash.substr(1);
        if (path == '') {
            path = '/';
        }

        this.state = {
            route: path
        }
    }

    getActiveRoute() {

    }

    /**
     * Get current router
     * @returns {string|*}
     */
    getCurrentRoute() {
        return this.state.route;
    }

    /**
     * Get all routes
     * @returns {*}
     */
    getRoutes() {
        return this.routes;
    }

    /**
     * Resolve component from route
     */
    resolve() {
        return this.routes[0].lookupByPath(this.state.route);
    }

    /**
     * Hash has changes
     */
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });
        })
    }

    /**
     * Render element
     * @returns {XML}
     */
    render() {
        console.log('Render root');
        const {children} = this.props;
        const Child = this.resolve().component;
        console.log(Child);
        return (
            <div>
                <Child title={this.resolve().title} currentRoute={this.state.route} router={this} />
            </div>
        )
    }

    /**
     * Build roots from js config
     * @param collection
     * @param parent
     * @returns {*}
     */
    buildRoots(collection, parent) {
        return collection.map((row, index) => {
            if (typeof row.children != 'undefined') {
                let route = new Route(row, parent, this);
                route.children = this.buildRoots(row.children, route)
                return route;
            }   else {
                return new Route(row, parent, this);
            }
        });
    }

}