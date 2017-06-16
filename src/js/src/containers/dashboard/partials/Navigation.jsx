import React, {Component} from 'react'
import {Link} from 'react-router';

class Navigation extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (<div className="ui inverted segment" style={{ borderRadius: 0}}>
            <div className="ui inverted secondary menu">
                <div className="item" style={{padding: '0px'}}>
                    <img width="32" height="32" className="logo margin-right-10" src="/img/logo.png" />
                </div>

                <a className="active item">
                    Главная
                </a>
                <a className="item">
                    Заказы
                </a>
                <a className="item">
                    Товары
                </a>
                <a className="item">
                    Бренды
                </a>
                <a className="item">
                    Поставщики
                </a>
                <a className="item">
                    Настройки
                </a>
            </div>
        </div>);
    }
}

export default Navigation;