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
            this.props.router.push('/login');
            return false;
        }
    }

    /**
     * Render layout
     * @returns {XML}
     */
    render() {
        console.log(this);
        return (
            <div>
                <Navigation router={this.props.router}>
                    <Navigation.Item path="/dashboard">Главная</Navigation.Item>
                    <Navigation.Item path="/orders">Заказы</Navigation.Item>
                    <Navigation.Item path="/products">Товары</Navigation.Item>
                    <Navigation.Item path="/brands">Бренды</Navigation.Item>
                    <Navigation.Item path="/employers">Персонал</Navigation.Item>
                    <Navigation.Item path="/settings">Настройки</Navigation.Item>
                    {this.props.loggedIn ?
                        <Navigation.Item align="right" path="/logout">Выход</Navigation.Item> :
                        <Navigation.Item align="right" path="/login">Вход</Navigation.Item>}
                </Navigation>

                <div style={{marginLeft: '14px', marginRight: '14px'}}>
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