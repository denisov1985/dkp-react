import React, {Component} from 'react'
import Navigation from 'components/navbar/Navigation'

export default class Layout extends Component {

    /**
     * Update page title
     */
    componentWillMount() {
        window.document.title = this.props.title || 'ISM Admin';
    }

    /**
     * Render layout
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Navigation router={this.props.router}>
                    <Navigation.Item path="/dashboard">Главная</Navigation.Item>
                    <Navigation.Item path="/orders">Заказы</Navigation.Item>
                </Navigation>
                {this.props.children}
            </div>
        )
    }

}